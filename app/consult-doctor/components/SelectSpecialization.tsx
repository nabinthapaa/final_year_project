"use client";
import { Specialization } from '@/utils/DoctorsSpecialist'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SelectSpecialization() {
    const router = useRouter()
    return (
        <div>
            <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
                <span>Specialization</span>
                <select
                    id="gender"
                    name="gender"
                    required
                    defaultValue="other"
                    onChange={(e) => router.push(`?s=${e.target.value}`)}
                    className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
                >
                    <option value="other" className="text-teal font-bold">
                        Other
                    </option>
                    {Specialization.map((v) => (
                        <option key={v} value={v} className="text-teal font-bold">
                            {v}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}
