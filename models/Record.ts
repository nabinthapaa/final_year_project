import { Schema, model, models } from "mongoose";

export const RecordSchema = new Schema(
  {
    doctor: {
      type: Schema.ObjectId,
      ref: "doctor",
      index: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "user",
      index: true
    },
    appointment:{
        type: Schema.ObjectId,
        ref: "appointment",
        index: true,
        unique: true
    },
    symptoms:{
        type: [String],
        default:[],
    },
    disease:{
        type: String,
        default:'',
    },
  },
  { timestamps: true }
);

const Record =
  models.Record || model("Record", RecordSchema);
export default Record;
