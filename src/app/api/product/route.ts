import { createProductController } from '@/controller/product.controller';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return await createProductController(req);
}
