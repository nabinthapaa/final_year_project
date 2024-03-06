import { Schema, model, models } from "mongoose";

const DoctorDocsSchema = new Schema(
  {
    citizenship: {
      type: Number,
      required: true,
      unique: true,
    },
    citizenship_id: {
      type: String,
      required: true,
      unique: true,
    },
    nmc_no: {
      type: Number,
      required: true,
      unique: true,
    },
    nmc_certificate: {
      type: String,
      required: true,
      unique: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "doctor",
      unique: true,
    },
  },
  { timestamps: true }
);

const DoctorDocs = models.DoctorDocs || model("DoctorDocs", DoctorDocsSchema);
export default DoctorDocs;
