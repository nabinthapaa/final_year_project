import { ConnectToDB } from "@/libs/connectToDB";
import Doctor from "@/models/Doctor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const dept = searchParams.get("dept");
    await ConnectToDB();

    const doctors = await Doctor.find({ department: dept })
      .select("-password")
      .lean();
    console.log(doctors);

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
