import {ConnectToDB} from "@/libs/connectToDB";
import {NextResponse} from "next/server";
import Doctor from "@/models/Doctor";
import DoctorDocs from "@/models/DoctorDocs";

export async function GET(req: Request){
    try{
        console.log('hello')
        await ConnectToDB();
        console.log('database connected in all doctor list')
        const doctorList = await Doctor.find();
        if(!doctorList) return NextResponse.json({
            message: 'Doctors not found'
        })
        const payload = await Promise.all(doctorList.map(async (e: any,i) => {
            const firstName = e.firstName.charAt(0).toUpperCase() + e.firstName.slice(1);
            const lastName = e.lastName.charAt(0).toUpperCase() + e.lastName.slice(1);
            const doctorDoc = await DoctorDocs.findById(e.doc_id);
            return {
                sn: i+1,
                name: firstName + ' ' + lastName,
                firstName: firstName,
                lastName: lastName,
                email: e.email,
                image: e.image,
                doctorId: e.doctorId,
                age: e.age,
                address: e.address,
                experience: e.experience,
                gender: e.gender,
                specialization: e.specialization,
                qualification: e.qualification,
                citizenship: doctorDoc.citizenship,
                citizenship_id: doctorDoc.citizenship_id,
                nmc_no: doctorDoc.nmc_no,
                nmc_certificate: doctorDoc.nmc_certificate,
                verified: e.verified ? 'verified' : 'pending'
            }
        }))

        return NextResponse.json({
            data: payload,
            status: 200
        })
    }
    catch (error) {
        console.log('error',error)
        return NextResponse.json({
                body: error
            }
        )
    }
}
