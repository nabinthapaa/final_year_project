import { ConnectToDB } from "@/libs/connectToDB";
import Doctor from "@/models/Doctor";
import DoctorDocs from "@/models/DoctorDocs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        let dept = searchParams.get("dept") as string;
        dept = dept.toLowerCase();
        await ConnectToDB();

        const doctors = await Doctor.find({ specialization: dept })
            .select("-password")
            .lean();
        console.log("Logging Docotors:", doctors);
        const doc_id = doctors.map((doctor) => doctor.doc_id);
        const nmcData = await DoctorDocs.find({
            _id: { $in: doc_id },
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
