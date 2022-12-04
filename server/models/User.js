import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 5 },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

//Export model
export default mongoose.model("User", UserSchema);
