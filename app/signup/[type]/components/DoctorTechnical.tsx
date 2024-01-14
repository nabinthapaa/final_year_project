import { DoctorTechnicalProps } from "../types/FormTypes";
import { FormWrapper } from "./FormWrapper";

export function DoctorTechnical({
  qualification,
  specialization,
  experience,
  department,
  updateFields,
}: DoctorTechnicalProps) {
  return (
    <FormWrapper title="Work Related Info">
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
        <span>Qualification</span>
        <input
          id="qualification"
          name="qualification"
          type="string"
          placeholder="Enter your Qualificaion..."
          required
          value={qualification}
          onChange={(e) => updateFields({ qualification: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
        <span>Specialization</span>
        <input
          id="specialization"
          name="specialization"
          placeholder="Enter your Specialization..."
          type="string"
          required
          value={specialization}
          onChange={(e) => updateFields({ specialization: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
        <span>Experience</span>
        <input
          id="experience"
          name="experience"
          placeholder="Enter your Experience in years..."
          type="number"
          required
          value={experience}
          onChange={(e) => updateFields({ experience: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
        <span>Email</span>
        <input
          id="department"
          name="department"
          placeholder="Enter your Department..."
          type="string"
          required
          value={department}
          onChange={(e) => updateFields({ department: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
    </FormWrapper>
  );
}
