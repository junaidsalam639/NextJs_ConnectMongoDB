import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import UserModel from "../../../models/UserModel";

export async function GET() {
  await connectMongoDB();
  const users = await UserModel.find();
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await UserModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Users deleted" });
}

export async function POST(request) {
  await connectMongoDB();
  const { name, email, password } = await request.json();
  if (name && email && password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User Created Successfully", user },
      { status: 200 }
    );
  }
  if (email && password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return NextResponse.json(
      { message: "Login successful", token, user },
      { status: 200 }
    );
  }
  return NextResponse.json({ message: "Invalid request" }, { status: 400 });
}
