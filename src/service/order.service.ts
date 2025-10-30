import mongoose, { Types } from "mongoose";
import { Order } from "@/models/Order";
import { IOrder } from "@/models/Order";

export const createOrderService = async (data: any): Promise<IOrder> => {
  // 🧠 Convert strings to ObjectIds here (safe + backend-only)
  if (data.userId && typeof data.userId === "string")
    data.userId = new Types.ObjectId(data.userId);

  if (data.addressId && typeof data.addressId === "string")
    data.addressId = new Types.ObjectId(data.addressId);

  if (Array.isArray(data.items)) {
    data.items = data.items.map((item: any) => ({
      ...item,
      product:
        typeof item.product === "string"
          ? new Types.ObjectId(item.product)
          : item.product,
    }));
  }

  const order = await Order.create(data);
  return order;
};

export const getAllOrdersService = async (): Promise<IOrder[]> => {
  return await Order.find()
    .populate("userId", "name email")
    .populate("addressId")
    .populate("items.product", "productName price");
};

export const getOrderByIdService = async (id: string): Promise<IOrder | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Order ID");

  return await Order.findById(id)
    .populate("userId", "name email")
    .populate("addressId")
    .populate("items.product", "productName price");
};

export const updateOrderStatusService = async (
  id: string,
  orderStatus: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Order ID");

  return await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    { new: true }
  ).populate("items.product", "productName");
};

export const deleteOrderService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Order ID");
  await Order.findByIdAndDelete(id);
};
