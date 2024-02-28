import { Specialization } from "@/utils/DoctorsSpecialist";
import { DoctorTechnicalProps } from "../types/FormTypes";
import { FormWrapper } from "./FormWrapper";

export function DoctorTechnical({
  qualification,
  specialization,
  experience,
  department,
  hospital,
  updateFields,
}: DoctorTechnicalProps) {
  return (
    <FormWrapper
      title="Work Related Info"
      subtitle="Please fill all the field for regtisteration"
    >
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
        <span>Degree</span>
        <input
          id="qualification"
          name="qualification"
          type="text"
          placeholder="Enter your Qualificaion..."
          required
          value={qualification}
          onChange={(e) => updateFields({ qualification: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
        <span>Experience</span>
        <input
          id="specialization"
          name="specialization"
          placeholder="Enter your Specialization..."
          type="text"
          required
          value={experience}
          onChange={(e) => updateFields({ experience: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
        <span>Specialization</span>
        <select
          id="gender"
          name="gender"
          required
          value={specialization}
          onChange={(e) => updateFields({ specialization: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        >
          <option selected={true} value="other" className="text-teal font-bold">
            Other
          </option>
          {Specialization.map((v) => (
            <option key={v} value={v} className="text-teal font-bold">
              {v}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
        <span>Department</span>
        <input
          id="department"
          name="department"
          placeholder="Enter your Department..."
          type="text"
          required
          value={department}
          onChange={(e) => updateFields({ department: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
        <span>Hospital</span>
        <input
          id="hospital"
          name="hospital"
          placeholder="Enter hospital currently working.."
          type="text"
          required
          value={hospital}
          onChange={(e) => updateFields({ hospital: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
    </FormWrapper>
  );
}
