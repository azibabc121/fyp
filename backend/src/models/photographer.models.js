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
      require: true,
    },
    lname: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      default : ""
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Photographer = mongoose.model("Photographer", photographerSchema);
export default Photographer;
