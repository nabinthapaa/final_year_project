import { ConnectToDB } from "@/libs/connectToDB";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id") as string;
        await ConnectToDB();
        const doctor = await Doctor.findById(id)
            .select("firstName lastName")
            .lean();
        let data = {
            //@ts-ignore
            _id: doctor?._id,
            //@ts-ignore
            name: `${doctor?.firstName} ${doctor?.lastName}`,
        };
        return NextResponse.json({
            message: "hello from the other side",
            status: 200,
            data,
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

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        await ConnectToDB();
        const appointment = await Appointment.findOne({ user: data.user, status: "booked" });
        console.log("Pending Appointment: ", appointment);
        if (!appointment) {
            await Appointment.create({
                ...data,
            });
            return NextResponse.json({
                message: "Appointment Created",
                status: 200,
            });
        }else{
            return NextResponse.json({
                message: "You have a pending appointment",
                status: 404,
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                status: 404,
            });
        }
    }
}
