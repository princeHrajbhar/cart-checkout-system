import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAddress extends Document {
  userId: Types.ObjectId;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  addressNote?: string; // 👈 New field for extra user-entered details
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    addressNote: { type: String }, // 👈 Optional field for extra info
  },
  { timestamps: true }
);

export const Address = mongoose.model<IAddress>('Address', addressSchema);
