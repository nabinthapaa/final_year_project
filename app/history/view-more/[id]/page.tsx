    import { ConnectToDB } from '@/libs/connectToDB';
    import { getDate } from '@/libs/getDate';
    import { parseDate } from '@/libs/parseDate';
    import Appointment from '@/models/Appointment';
    import User from '@/models/User';
    import Record from '@/models/Record';
    import React from 'react';
    import Image from 'next/image';

    interface Appointment {
        _id: string;
        doctor: string;
        user: {
            gender: string;
            _id: string;
            email: string;
            firstName: string;
            lastName: string;
            image: string;
            age: number;
            password: string;
            createdAt: string;
            updatedAt: string;
            __v: number;
        };
        meetingTime: string;
        status: string;
        symptoms: string[];
        suspectedDisease: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }

    async function getAppointmentDetails(id: string) {
        "use server";
        await ConnectToDB();
        const appointment = await Appointment.findById(id).lean();
        //@ts-ignore
        appointment.user = await User.findById(appointment.user).lean();
        return JSON.stringify(appointment);
    }


    export default async function page({ searchParams: { id } }: { searchParams: { id: string | string[] | undefined } }) {
        const appointment = JSON.parse(await getAppointmentDetails(id as string)) as Appointment;
        const user = appointment.user;


        return (
            <div className='container mx-auto mt-10'>
                <h1 className='text-text font-bold text-3xl text-center'> Appoiment Id: <span className='text-accent underline'>{appointment._id}</span> </h1>
                <div className='max-w-[600px] mt-10 mx-auto text-text'>
                    <div className="relative w-[200px] h-[200px] overflow-hidden rounded-lg">
                        <Image src={user.image} alt="Picture of Patient" fill />
                    </div >
                    <div className='text-xl space-y-4 mt-5'>
                        <p><span className='font-bold text-xl'>Name: </span> <span className='text-accent underline font-bold'>{user.firstName} {user.lastName}</span> </p>
                        <p><span className='font-bold text-xl'> Booked on: </span>  <span className='text-accent'>{parseDate(getDate(appointment.createdAt))}</span></p>
                        <p> <span className='font-bold text-xl'>Booked For: </span> <span className='text-accent'>{parseDate(getDate(appointment.meetingTime))}</span></p>
                        <p> <span className='font-bold text-xl'>Age: </span> <span className='text-accent'>{user.age}</span> </p>
                    </div>
                </div>
            </div>
        )
}
