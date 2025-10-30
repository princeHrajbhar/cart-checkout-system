import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  addressId?: Types.ObjectId; // 👈 Reference to Address document
  addressSnapshot: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  }; // 👈 Saved copy at order time
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: "COD" | "ONLINE";
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus:
    | "Processing"
    | "Confirmed"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  orderDate: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // 🏠 Address reference and snapshot
    addressId: { type: Schema.Types.ObjectId, ref: "Address" },
    addressSnapshot: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    orderDate: { type: Date, default: Date.now },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
