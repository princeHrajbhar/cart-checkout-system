import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Address } from "@/models/Address";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { userId, street, city, state, pincode, country, addressNote } = body;

    if (!userId || !street || !city || !state || !pincode) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const address = await Address.create({
      userId,
      street,
      city,
      state,
      pincode,
      country,
      addressNote,
    });

    return NextResponse.json(
      { message: "Address created successfully", address },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating address:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId)
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );

    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ addresses }, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching addresses:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
