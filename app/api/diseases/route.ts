import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let data = await req.formData();
    const url = process.env.SYMPTOMS_BACKEND_URL || "";
    // const res = await fetch(url, {
    //   method: "POST",
    //   body: data,
    // });
    // data = await res.json();
    data = {
      predicteddisease: "Paralysis (Brain hemmorage)",
      confidencescore: 58.99,
      consultdoctor: "Neurologist",
    };
    return NextResponse.json({
      message: "Account created Successfully",
      status: 201,
      data,
    });
  } catch (error: any) {
    console.error(error.stack || error.message || "Internal Server Error");
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
