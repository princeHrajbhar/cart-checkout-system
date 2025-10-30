import { z } from "zod";

export const orderValidator = z.object({
  userId: z.string(),
  addressId: z.string().optional(),
  addressSnapshot: z.object({
    fullName: z.string(),
    phone: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    country: z.string().optional(),
  }),
  items: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  totalAmount: z.number().min(0),
  paymentMethod: z.enum(["COD", "ONLINE"]),
});
