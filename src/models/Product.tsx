import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  description: string;
  price: number;
  photo: {
    public_id: string;
    secure_url: string;
  };
}

const ProductSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    photo: {
      public_id: {
        type: String,
        required: [true, "Photo public_id is required"],
      },
      secure_url: {
        type: String,
        required: [true, "Photo secure_url is required"],
      },
    },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
