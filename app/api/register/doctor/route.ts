import { ConnectToDB } from "@/libs/connectToDB";
import { saveImage } from "@/libs/saveImage";
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
        department: data.department,
        image: data.image_url,
        address: data.address,
        gender: data.gender,
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
        const form_data = await req.formData();
        const citizenship = form_data.get("citizenship_id") as unknown as File;
        const nmc_certificate = form_data.get("nmc_certificate") as unknown as File;
        const image = form_data.get("image") as unknown as File;
        const data = JSON.parse(form_data.get("otherinfo") as unknown as string);
        const docs_info = JSON.parse(
            form_data.get("otherdocs") as unknown as string
        );
        data.image_url = await saveImage(image);
        docs_info.citizenship_id = await saveImage(citizenship);
        docs_info.nmc_certificate = await saveImage(nmc_certificate);

        const id = await createDoctor(data);
        docs_info.doctorId = id;
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
            { status: 201 }
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
