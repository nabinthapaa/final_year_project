import { getServerSession } from 'next-auth'
import React, { Suspense } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import PatientHistory from './components/PatientHistory';
import DoctorHistory from './components/DoctorHistory';


export const fetchCache = 'force-no-store'

export default async function History() {
    const session = await getServerSession(authOptions);
    if (session?.user.type === "user") {
        return (
            <Suspense fallback={<div>Loading history...</div>}>
                <PatientHistory id={session.user._id as string} />
            </Suspense>
        )
    }
    else if (session?.user.type === "doctor") return <DoctorHistory id={session.user._id} />
}
