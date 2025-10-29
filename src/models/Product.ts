import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;  // 👈 important
  productName: string;
  description: string;
  price: number;
  photo: {
    secure_url: string;
    public_id: string;
  };
}

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photo: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
