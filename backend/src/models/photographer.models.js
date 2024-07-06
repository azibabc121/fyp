import mongoose, { Schema } from "mongoose";

// fname: "df",
// lname: "f",
// category: "d",
// address: "d",
// phone: "123",
// email: "sd",
const photographerSchema = new Schema(
  {
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    category: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const Photographer = mongoose.model("Photographer", photographerSchema);
export default Photographer;
