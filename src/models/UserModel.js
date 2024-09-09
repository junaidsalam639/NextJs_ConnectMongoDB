import mongoose, { Schema } from "mongoose";

const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.models.User || mongoose.model("User", user);

export default UserModel;
