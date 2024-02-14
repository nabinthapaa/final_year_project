import { ConnectToDB } from "@/libs/connectToDB";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import DoctorDocs from "@/models/DoctorDocs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    await ConnectToDB();
    const appointment = await Appointment.findOne({ user: id })
      .populate("doctor")
      .lean();
    const nmc = await DoctorDocs.findOne({
      //@ts-ignore
      doctorId: appointment?.doctor?._id,
    });
    //@ts-ignore
    appointment.doctor.nmc = nmc.nmc_no;
    return NextResponse.json({
      message: "Appointment retrieved",
      status: 200,
      data: appointment,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 404,
      });
    }
  }
}
