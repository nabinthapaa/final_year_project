import { ConnectToDB } from "@/libs/connectToDB";
import Doctor from "@/models/Doctor";
import DoctorDocs from "@/models/DoctorDocs";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

async function hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
}

async function createDoctor(data: any): Promise<string> {
    await ConnectToDB();
    const doctor = await Doctor.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        age: data.age,
        password: await hashPassword(data.password),
        qualification: data.qualification,
        specialization: data.specialization,
        experience: data.experience,
        image: data.image,
        address: data.address,
        gender: data.gender,
        doctorId: data.doctorId
    });
    return doctor._id;
}

async function createDoctorDocs(docs_info: any): Promise<void> {
    await ConnectToDB();
    const doc = await DoctorDocs.create({
        ...docs_info,
    });
    return doc._id
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();
        data.doctorId = Math.ceil(Math.random() * 10000);
        const id = await createDoctor(data);
        const docs_info = {
            citizenship: data.docs.citizenship,
            citizenship_id: data.docs.citizenship_id,
            nmc_no: data.docs.nmc_no,
            nmc_certificate: data.docs.nmc_certificate,
            doctorId: id
        }
        try {
            const document_id = await createDoctorDocs(docs_info);
            await ConnectToDB();
            const doctor = await Doctor.findById(id);
            doctor.doc_id = document_id;
            await doctor.save();
        } catch (e) {
            if (e instanceof Error) {
                await Doctor.findByIdAndDelete(id);
                throw new Error(e.message);
            }
        }

        return NextResponse.json(
            { message: "Account created Successfully" },
            { status: 200 }
        );
    } catch (error:any) {
        if (error instanceof Error)
            console.log(error.message);
            return NextResponse.json(
                { message: error.message || "Internal Server Error" },
                { status: 500 }
            );
    }
}
