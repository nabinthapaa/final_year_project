"use client";
import React, { useState } from 'react'
import SelectSpecialization from './components/SelectSpecialization'
import SearchByName from './components/SearchByName'
import { useSearchParams } from 'next/navigation';
import Loader from '@/components/Loader';
import DoctorCard from '../suggested-doctor/components/DoctorCard';

export default function ConsultDoctor() {
    const searchParams = useSearchParams();
    const s = searchParams.get("s") || null;
    const name = searchParams.get("name") || null;
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([])


    const handleSearch = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`/api/search-doctor?name=${name}&s=${s}`);
            const { data } = await res.json();
            console.log(res)
            setDoctors(data);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container mx-auto mt-10 text-accent'>
            <h1 className='text-center text-text font-bold text-4xl'>Consult Doctor</h1>
            <div className='grid grid-cols-[0.8fr,1fr,0.8fr] mt-4 gap-40'>
                <SelectSpecialization />
                <SearchByName />
                <button
                    className="bg-teal px-10 py-2 font-bold h-16 self-end w-full text-lg rounded-full disabled:opacity-50 disabled:grid disabled:grid-cols-[0.3fr,1fr] content-center"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading && <div className="relative">
                        <Loader />
                    </div>}
                    <span className="">{loading ? "Searching..." : "Search"}</span>
                </button>
            </div>
            {doctors.length > 0 && (
            <>
                <h2 className='text-text font-bold text-left text-3xl mt-10'>Results :</h2>
                <div className='flex flex-wrap gap-10 text-text mt-4'>
                    {doctors.map((doctor:any) => <DoctorCard key={doctor._id} data={doctor} />)}
                </div>
                </>
            )}
        </div>
    )
}
