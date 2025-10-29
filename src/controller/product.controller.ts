import { NextRequest, NextResponse } from 'next/server';
import { productFormSchema } from '@/validator/product.validator';
import { createProductService, getAllProductsService } from '@/service/product.service';
import { connectDB } from '@/lib/connectDB';

export async function createProductController(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data = {
      productName: formData.get('productName'),
      description: formData.get('description'),
      price: formData.get('price'),
      photo: formData.get('photo'),
    };

    const validatedData = productFormSchema.parse(data);

    await connectDB();

    const product = await createProductService(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Product creation error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function getProductsController() {
  try {
    await connectDB();
    const products = await getAllProductsService();
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
