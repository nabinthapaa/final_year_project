"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

export default function SearchByName() {
    const router = useRouter();
    return (
        <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
            <span>Doctor Name</span>
            <input
                type='text'
                placeholder="Search Doctor by Name...."
                required
                onChange={(e) => router.push(`?name=${e.target.value}`)}
                className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
            />
        </label>
    )
}
