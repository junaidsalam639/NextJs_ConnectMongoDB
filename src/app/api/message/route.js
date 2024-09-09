// POST /api/message
import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import MessageModel from "../../../models/MessageModel";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectMongoDB();

  const authHeader = request.headers.get("Authorization");
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const _id = decoded.id;

    const { recipient, message } = await request.json();

    if (!recipient || !message) {
      return NextResponse.json(
        { message: "Recipient and message are required" },
        { status: 400 }
      );
    }

    const messages = await MessageModel.create({
      sender: _id,
      recipient,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully", messages },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function GET(request) {
  await connectMongoDB();

  const authHeader = request.headers.get("Authorization");
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const _id = decoded.id;

    const url = new URL(request.url);
    const recipient = url.searchParams.get("recipient");

    if (!recipient) {
      return NextResponse.json(
        { message: "Recipient is required" },
        { status: 400 }
      );
    }

    // Condition 1: { sender: _id, recipient }
    // Example: Agar aapka user ID user1 hai aur aap user2 ko message bhejte hain, to yeh condition user1 se user2 ko bheje gaye messages ko dhoondhegi.
    // Condition 2: { sender: recipient, recipient: _id }
    // Example: Agar user2 aapko message bheF
    // Maan lijiye:
    // Aapka user ID user1 hai.
    // Aap recipient ko user2 keh kar specify karte hain.
    // Toh yeh query:
    // user1 se user2 ko bheje gaye messages ko dhoondhegi.
    // Aur user2 se user1 ko bheje gaye messages ko bhi dhoondhegi.

    const messages = await MessageModel.find({
      $or: [
        { sender: _id, recipient },
        { sender: recipient, recipient: _id },
      ],
    });

    return NextResponse.json(
      { message: "Messages fetched successfully", messages },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
