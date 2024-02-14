import { ConnectToDB } from "@/libs/connectToDB";
import Doctor from "@/models/Doctor";
import DoctorDocs from "@/models/DoctorDocs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const dept = searchParams.get("dept");
    await ConnectToDB();

    const doctors = await Doctor.find({ department: dept })
      .select("-password")
      .lean();

    const doctorIds = doctors.map((doctor) => doctor._id);
    const nmcData = await DoctorDocs.find({
      doctorId: { $in: doctorIds },
    })
      .select("nmc_no doctorId")
      .lean();
    doctors.forEach((doctor) => {
      const nmcInfo = nmcData.find((nmc) => nmc.doctorId.equals(doctor._id));
      if (nmcInfo) doctor.nmc = nmcInfo.nmc_no;
    });

    return NextResponse.json({
      message: "Retrieved Successfully",
      status: 200,
      data: doctors,
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
