import { NextRequest, NextResponse } from "next/server";
import { validateRegister, validateLogin } from "@/validator/user.validator";
import { registerUser, loginUser } from "@/service/user.service";
import { connectDB } from "@/lib/connectDB";

export const handleRegister = async (req: NextRequest) => {
  await connectDB();
  const body = await req.json();

  const error = validateRegister(body);
  if (error) return NextResponse.json({ success: false, message: error }, { status: 400 });

  try {
    const user = await registerUser(body.name, body.email, body.password);
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
};

export const handleLogin = async (req: NextRequest) => {
  await connectDB();
  const body = await req.json();

  const error = validateLogin(body);
  if (error) return NextResponse.json({ success: false, message: error }, { status: 400 });

  try {
    const token = await loginUser(body.email, body.password);
    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
};
