import { ConnectToDB } from "@/libs/connectToDB";
import Appointment from "@/models/Appointment";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") as string;
    await ConnectToDB();
    const appointments = await Appointment.find({ doctor: id, status:"booked"})
      .lean();
    const user_ids = appointments.map((appointment) => appointment.user);
    const users = await User.find({
      _id: { $in: user_ids },
    })
      .lean();

        appointments.forEach((appointment) => {
            const userInfo = users.find((user) => user._id.equals(appointment.user));
            if (userInfo) appointment.user = userInfo;
        });
    return NextResponse.json({
      message: "Appoint retrieved Succesfully",
      status: 200,
      data: appointments,
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
