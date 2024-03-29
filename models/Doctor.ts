import mongoose, { Schema, models } from "mongoose";

const DoctorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    DateOfBirth: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      default: "not-specified",
    },
    qualification: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      index: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    verified:{
        type: Boolean,
        default: false
    },
    hospital: {
      type: String,
    },
    doc_id:{
        type: Schema.Types.ObjectId,
        ref: "doctordocs"
    }
  },
  { timestamps: true }
);

const Doctor = models.Doctor || mongoose.model("Doctor", DoctorSchema);
export default Doctor;
