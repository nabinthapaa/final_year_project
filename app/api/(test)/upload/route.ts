import { ConnectToDB } from "@/libs/connectToDB";
import Doctor from "@/models/Doctor";
import axios from "axios";
import { hash } from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { unlink, writeFile } from "fs/promises";
import multer from "multer";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to handle file uploads
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

async function createDoctor(data: any, imageUrl: string): Promise<void> {
  await ConnectToDB();
  await Doctor.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    age: data.age,
    password: await hashPassword(data.password),
    qualification: data.qualification,
    specialization: data.specialization,
    experience: data.experience,
    department: data.department,
    nmc: data.nmc,
    imageUrl: imageUrl, // Save the URL of the uploaded image in the database
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

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
