import ImageUploader from "@/components/UploadImageButton";
import React from "react";
import { DoctorDocsProps } from "../types/FormTypes";
import { FormWrapper } from "./FormWrapper";

// add leading zero

function DocotorDocs({
  citizenship,
  citizenship_id,
  nmc_no,
  nmc_certificate,
  updateFields,
}: DoctorDocsProps) {
  return (
    <FormWrapper
      title="Account Credentials"
      subtitle="Please remeber these credentials for future usage"
    >
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
        <span>Citizenship Number</span>
        <input
          id="citizenship_number"
          name="citzenship_number"
          type="number"
          placeholder="Enter your Citizenship No. (exclude '-')..."
          required
          value={citizenship}
          onChange={(e) =>
            updateFields({ citizenship: Number(e.target.value) })
          }
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <ImageUploader
        image={citizenship_id}
        handleChange={(v: { [key: string]: File }) => updateFields({ ...v })}
        key_="citizenship_id"
        label="Upload Citizenship"
      />
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left  w-full">
        <span>NMC No.</span>
        <input
          id="nmc"
          name="nmc"
          type="number"
          placeholder="Enter the NMC number..."
          required
          value={nmc_no}
          onChange={(e) => updateFields({ nmc_no: Number(e.target.value) })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <ImageUploader
        image={nmc_certificate}
        handleChange={(v: { [key: string]: File }) => updateFields({ ...v })}
        key_="nmc_certificate"
        label="Upload NMC Certificate"
      />
    </FormWrapper>
  );
}

export default DocotorDocs;
