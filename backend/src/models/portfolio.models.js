import mongoose, { Schema } from "mongoose";

const portfolioSchema = new Schema(
  {
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
    },
    portfolio: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export { Portfolio };
