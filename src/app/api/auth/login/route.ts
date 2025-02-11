import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/user.model";
import { connectDb } from "@/config/database";
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export async function POST(req: Request) {
  await connectDb();

  try {
    const { email, password } = await req.json();
    
    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: "Email and Password are required" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    console.log('existingUser:', existingUser);
    if (!existingUser) {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }
    

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 409 });
    }
    const payload = { email: existingUser.email, id: existingUser._id,name:existingUser.userName };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    console.log('token:', token);
    const serialized = serialize("accessToken", token, {
        httpOnly: true, // Cannot be accessed by JavaScript
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });

      const response = NextResponse.json({ message: "Login successful" ,data:payload});
      response.headers.set("Set-Cookie", serialized);

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
