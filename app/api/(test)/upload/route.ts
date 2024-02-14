import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse form data including files
    const data = await req.formData();
    const url = process.env.SYMPTOMS_BACKEND_URL || "";
    const res = await axios.post(url, data);
    console.log(await res.data);
    return NextResponse.json(
      { message: "Account created Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error.stack || error.message || "Internal Server Error");
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
