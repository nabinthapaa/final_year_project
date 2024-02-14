import { ConnectToDB } from "@/libs/connectToDB";
import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") as string;
    await ConnectToDB();
    const appointment = await Appointment.find({ doctor: id })
      .populate("user")
      .lean();
    return NextResponse.json({
      message: "Appoint retrieved Succesfully",
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
