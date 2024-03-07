import DoctorCard from '@/app/suggested-doctor/components/DoctorCard';
import { getDate } from '@/libs/getDate';
import { parseDate } from '@/libs/parseDate';
import Appointment from '@/models/Appointment';
import Doctor from '@/models/Doctor';
import React from 'react'
import Link from "next/link";

async function getPatientHistory(id: string) {
    "use server";
    const appointments = await Appointment.find({ user: id, status:"completed"})
        .lean();
    const doctor_ids = appointments.map((appointment) => appointment.doctor);
    const doctors = await Doctor.find({
        _id: { $in: doctor_ids },
    })
        .lean();

    appointments.forEach((appointment) => {
        const doctorInfo = doctors.find((doctor) => doctor._id.equals(appointment.doctor));
        if (doctorInfo) appointment.doctor = doctorInfo;
    });
    return appointments;

}


export default async function PatientHistory({ id }: { id: string }) {
    const history = await getPatientHistory(id);
    console.log("history----", history)
    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl font-bold text-center mt-10 text-text'>My History</h1>
            {history.length === 0 ? (
                <p className='text-2xl text-center container font-bold text-text'>
                    No History
                </p>
            ) :(
                    <div className='flex flex-wrap gap-4'>
                    {history.map((data) =>
                        <div key={data._id as string} className='text-text'>
                            <DoctorCard data={data.doctor} showAppointment={false} >
                            </DoctorCard>
                            <div className="w-[80%] h-[20px] mt-4">
                                <Link href={`/history/view-more/${data._id}`} className="bg-accent text-text text-bold px-4 py-2"> View More </Link>
                            </div>
                            <p className='mt-4'>
                                <span className='font-bold'>Appointment Date: </span>
                                {parseDate(getDate(data.meetingTime))}
                            </p>
                        </div>
                    )}
                    </div>
                )}
        </div>
    )
}
