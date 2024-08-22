import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  points: Number,
});

let User;

try {
  User = model("User");
} catch (error) {
  User = model("User", userSchema);
}

export { User as User };