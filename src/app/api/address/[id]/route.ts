import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Address } from "@/models/Address";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await Address.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { message: "Address not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Address deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error deleting address:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
