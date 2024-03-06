import { ConnectToDB } from '@/libs/connectToDB'
import Doctor from '@/models/Doctor';
import React from 'react'
import DoctorTable from './components/DoctorTable';
import DoctorDocs from '@/models/DoctorDocs';

async function GetDoctors() {
    "use server";
    try {
        await ConnectToDB();
        const doctors = await Doctor.find()
            .select("-password")
            .lean();
        const doc_id = doctors.map((doctor) => doctor.doc_id);
        const nmcData = await DoctorDocs.find({
            _id: { $in: doc_id },
        })
            .lean();
        doctors.forEach((doctor) => {
            const nmcInfo = nmcData.find((nmc) => nmc.doctorId.equals(doctor._id));
            if (nmcInfo) doctor.docs = nmcInfo;
        });
        return doctors;
    } catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    };
};

export default async function AdminPage() {
    const doctors = await GetDoctors();
    return (
        <div className='container mx-auto mt-10'>
            <h1 className='text-text font-bold text-center text-4xl'>Admin Panel</h1>
            <DoctorTable data={doctors} />
        </div>
    )
}
