import { z } from 'zod';

export const productFormSchema = z
  .object({
    productName: z
      .string()
      .min(3, 'Product name must be at least 3 characters long'),

    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long'),

    price: z
      .string()
      .transform((val) => parseFloat(val))
      .refine((num) => !isNaN(num) && num > 0, {
        message: 'Price must be a valid positive number',
      }),

    photo: z
      .any()
      .refine((file) => file instanceof File && file.size > 0, {
        message: 'Photo file is required and cannot be empty',
      })
      .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
        message: 'Only .jpg, .jpeg or .png images are allowed',
      }),
  })
  .strict();
