import { ConnectToDB } from "@/libs/connectToDB";
import User from "@/models/User";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

async function createUser(data: any): Promise<void> {
  await ConnectToDB();
  await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    age: data.age,
    password: await hashPassword(data.password),
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    await createUser(data);

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
