import Cart from "@/models/Cart";
import Product, { IProduct } from "@/models/Product";
import mongoose from "mongoose";
import { ICart, ICartItem } from "@/models/Cart";

export async function addToCartService(
  userId: string,
  productId: string,
  quantity: number = 1
): Promise<ICart> {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  // 👇 Type-safe query (gives _id type as ObjectId)
  const product = await Product.findById(productId).lean<IProduct | null>();
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ userId }).populate("items.product") as ICart | null;

  if (!cart) {
    // 🆕 Create new cart
    const newCart = new Cart({
      userId,
      items: [{ product: product._id, quantity }],
      totalPrice: product.price * quantity,
    });

    await newCart.save();
    return newCart as ICart;
  }

  // 🧾 Update existing cart
  const existingItem = cart.items.find(
    (item: ICartItem) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: new mongoose.Types.ObjectId(product._id), quantity });
  }

  // ♻️ Recalculate total price
  const productDocs = await Product.find({
    _id: { $in: cart.items.map((i: ICartItem) => i.product) },
  }).lean<IProduct[]>();

  cart.totalPrice = cart.items.reduce((acc: number, item: ICartItem) => {
    const productDoc = productDocs.find(
      (p: IProduct) => p._id.toString() === item.product.toString()
    );
    return acc + ((productDoc?.price ?? 0) * item.quantity);
  }, 0);

  await cart.save();
  return cart;
}
