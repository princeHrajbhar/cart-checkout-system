import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { addToCartService } from "@/service/cart.service";

export async function addToCartController(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { userId, productId, quantity } = body;

    if (!userId || !productId)
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });

    const cart = await addToCartService(userId, productId, quantity || 1);

    return NextResponse.json({ success: true, cart }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
