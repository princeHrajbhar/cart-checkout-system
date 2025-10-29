import { UploadImage } from '@/lib/upload-image';
import Product from '@/models/Product';

export async function createProductService(data: any) {
  const { productName, description, price, photo } = data;

  // Upload image to Cloudinary
  const uploadResult = await UploadImage(photo, 'products');

  // Save product directly to DB
  const product = await Product.create({
    productName,
    description,
    price,
    photo: uploadResult,
  });

  return product;
}

export async function getAllProductsService() {
  return await Product.find().sort({ createdAt: -1 });
}
