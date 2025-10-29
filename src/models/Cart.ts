import mongoose, { Schema, Document, models } from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId; // Reference to Product
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // assuming you’ll have a User model
      required: true,
    },
    items: {
      type: [CartItemSchema],
      required: true,
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = models.Cart || mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
