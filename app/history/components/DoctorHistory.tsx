import DoctorCard from '@/app/suggested-doctor/components/DoctorCard';
import { getDate } from '@/libs/getDate';
import { parseDate } from '@/libs/parseDate';
import Appointment from '@/models/Appointment';
import User from '@/models/User';
import React from 'react'

async function getDoctorHistory(id: string) {
    "use server";
    const appointments = await Appointment.find({ doctor: id, status: "completed" })
        .lean();
    const user_ids = appointments.map((appointment) => appointment.user);
    const users = await User.find({
        _id: { $in: user_ids },
    })
        .lean();

    appointments.forEach((appointment) => {
        const userInfo = users.find((user) => user._id.equals(appointment.user));
        if (userInfo) appointment.user = userInfo;
    });
    return appointments;
}


export default async function DoctorHistory({ id }: { id: string }) {
    const history = await getDoctorHistory(id);
    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl font-bold text-center mt-10 text-text mb-4'>My History</h1>
            {history.length === 0 ? (
                <p className='text-2xl text-center container font-bold text-text'>
                    No History
                </p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {history.map((data) =>
                        <div key={data._id as string} className='text-text'>
                            <DoctorCard data={data.user} showAppointment={false} >
                                <p>{data.suspectedDisease || "Malaria"}</p>
                            </DoctorCard>
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
