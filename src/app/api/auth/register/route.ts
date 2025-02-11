import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/user.model";
import { connectDb } from "@/config/database";

export async function POST(req: Request) {
  try{
    await connectDb();
    const { userName, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);  
    const existingUser = await userModel.findOne({ email });
    // console.log('existingUser:', existingUser);
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });  
    const newUser = new userModel({ userName, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  }catch(error){
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}