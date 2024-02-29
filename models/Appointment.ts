import { Schema, model, models } from "mongoose";

export const AppointmentSchema = new Schema(
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
    meetingTime: {
      type: Date,
      required: true,
    },
    status:{
        type: String,
        default: "booked"
    },
  },
  { timestamps: true }
);

const Appointment =
  models.Appointment || model("Appointment", AppointmentSchema);
export default Appointment;
