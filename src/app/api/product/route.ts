import { NextRequest } from 'next/server';
import { getProductsController, createProductController } from '@/controller/product.controller';

export async function GET(req: NextRequest) {
  return await getProductsController();
}

export async function POST(req: NextRequest) {
  return await createProductController(req);
}