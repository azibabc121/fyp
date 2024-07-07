import mongoose, { Schema } from "mongoose";
import { Portfolio } from "./portfolio.models.js";

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
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Portfolio",
      type: "string",
      default: "default",
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

photographerSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.model.findOne(this.getFilter());
    if (doc && doc.portfolio) {
      await Portfolio.findByIdAndDelete(doc.portfolio);
    }
    next();
  } catch (error) {
    console.log("Error in pre remove photographer middleware", error);
    next(error);
  }
});


const Photographer = mongoose.model("Photographer", photographerSchema);
export default Photographer;
