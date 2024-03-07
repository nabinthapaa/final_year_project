"use client";

import { FormEvent, useRef, useState } from "react";
import {useRouter} from "next/navigation";

interface Diagnosis{
    symptoms: string[];
    suspected: string;
    appointment: any
}

export default function Diagnosis({ symptoms, suspected, appointment }: Diagnosis ) {
    const [symptom, setSymptom] = useState(symptoms.join(", "));
    const [disease, setDisease] = useState(suspected);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const router = useRouter()
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
            if(res?.ok){
                alert("Record Updated");
                router.push("/appointments")
            }
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

    const handleAppointmentChange = async () => {
        try {
            let appointment_u = JSON.parse(appointment);
            const res = await fetch(`/api/make-appointment`,{
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: appointment_u._id})
            })
            if(res?.ok){
                const message = await  res.json();
                alert(message.message)
            }
            if(res?.error) throw new Error("Something went wrong")
        }catch(error){
            if (errror instanceof Error){
                console.log(error)
                // @ts-ignore
                alert(error.message)
            }
        }

    }


    return (
        <div className="mt-10">
            <hr />
            <div className="w-[1080px] mt-5 mx-auto">
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
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
                            className="w-full bg-transparent text-text border rounded-lg font-normal text-[20px] h-auto p-4"
                            value={disease}
                            type="text"
                            onChange={(e) => setDisease(_ => e.target.value)}>
                        </input>
                    </label>
                    <div className='flex gap-10'>
                    <button type="submit" className="min-w-[300px] font-bold border border-accent text-text hover:bg-accent cursor-pointer rounded-lg w-[60%] py-4" > Update </button>
                    <button type="button" onClick={handleAppointmentChange} className="min-w-[300px] font-bold border border-accent text-text hover:bg-accent cursor-pointer rounded-lg w-[60%] py-4" > Set as Done </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
