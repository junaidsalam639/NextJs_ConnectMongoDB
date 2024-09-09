import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import UserModel from "../../../../models/UserModel";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newEmail: email,
    newPassword: password,
  } = await request.json();
  
  await connectMongoDB();
  await UserModel.findByIdAndUpdate(id, { name, email, password });
  return NextResponse.json({ message: "User Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await UserModel.findOne({ _id: id });
  return NextResponse.json({ data: user }, { status: 200 });
}


