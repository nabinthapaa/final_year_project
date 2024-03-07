import { getServerSession } from 'next-auth'
import React, { Suspense } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PatientHistory from './components/PatientHistory';
import DoctorHistory from './components/DoctorHistory';
import {redirect} from "next/navigation";
import {unstable_noStore as noStore} from "next/cache";


export default async function History() {
    noStore()
    const session = await getServerSession(authOptions);
    if(!session) redirect("/")
    if (session.user) {
        return (
            <Suspense fallback={<div>Loading history...</div>}>
                <PatientHistory id={session.id as string} />
            </Suspense>
        )
    }
    else if (session.doctor)return (
        <Suspense fallback={<div>Loading history...</div>}>
            <DoctorHistory id={session.id as string} />
        </Suspense>
    )
}
