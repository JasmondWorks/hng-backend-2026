import { model, Schema } from "mongoose";

const classificationSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, default: null },
    probability: { type: Number, required: true },
    sampleSize: { type: Number, required: true },
    isConfident: { type: Boolean, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } },
);

export const ClassificationModel = model("Classification", classificationSchema);
