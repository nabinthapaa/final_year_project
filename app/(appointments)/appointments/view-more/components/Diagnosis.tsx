"use client";

import { FormEvent, useRef, useState } from "react";

interface Diagnosis{
    symptoms: string[];
    suspected: string;
    appointment: any
}

export default function Diagnosis({ symptoms, suspected, appointment }: Diagnosis ) {
    const [symptom, setSymptom] = useState(symptoms.join(", "));
    const [disease, setDisease] = useState(suspected);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        //@ts-ignore
        const symptoms = symptom.trim().split(", ");
        appointment = JSON.parse(appointment);
        const record = {
            appointment: appointment._id,
            doctor: appointment.doctor,
            user: appointment.user._id,
            symptoms,
            disease
        }
        // request to update-record
        try {
            const res =  await fetch(`/api/update-record`, {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(record)
            });
            if(res?.ok) alert("Record Updated");
            if(!res?.ok){
                const error = (await res.json()).error;
                throw new Error(error)
            }
        } catch (error) {
            if(error instanceof Error){
                alert(error.message);
            }
        }
    }

    return (
        <div className="mt-10">
            <hr />
            <div className="w-[600px] mt-5 flex flex-wrap gap-4 mx-auto">
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-fit">
                        <span className="text-accent">Symptoms</span>
                        <textarea
                            ref={textareaRef}
                            id="symptoms"
                            className="w-full bg-transparent text-text font-normal text-[20px] border rounded-lg h-auto p-4"
                            value={symptom}
                            onChange={(e) => setSymptom(_ => e.target.value)}>
                        </textarea>
                    </label>
                    <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
                        <span className="text-accent">Diseases</span>
                        <input
                            id="disease"
                            className="w-full bg-transparent text-text border rounded-lg font-normal text-[20px] h-auto w-full p-4"
                            value={disease}
                            type="text"
                            onChange={(e) => setDisease(_ => e.target.value)}>
                        </input>
                    </label>
                    <button type="submit" className="font-bold border border-accent text-text hover:bg-accent cursor-pointer rounded-lg w-[60%] py-4" > Update </button>
                </form>
            </div>
        </div>
    )
}
