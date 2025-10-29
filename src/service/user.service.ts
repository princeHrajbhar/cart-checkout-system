import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const registerUser = async (name: string, email: string, password: string): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials.");

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  return token;
};
