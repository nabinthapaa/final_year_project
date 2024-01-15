import { UserFormProps } from "../types/FormTypes";
import { FormWrapper } from "./FormWrapper";

export function PersonalForm({
  firstName,
  lastName,
  age,
  address,
  gender,
  updateFields,
}: UserFormProps) {
  return (
    <FormWrapper
      title="Personal Details"
      subtitle="Please provide all the field correctly"
    >
      <div className="flex flex-col space-y-4 w-full">
        <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
          <span>First Name</span>
          <input
            id="firstName"
            name="firstName"
            placeholder="Enter you first name..."
            value={firstName}
            required
            onChange={(e) => updateFields({ firstName: e.target.value })}
            className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
          />
        </label>

        <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
          <span>Last Name</span>
          <input
            id="lastName"
            name="lastName"
            placeholder="Enter your last name..."
            required
            value={lastName}
            onChange={(e) => updateFields({ lastName: e.target.value })}
            className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
          />
        </label>
        <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
          <span>Age</span>
          <input
            id="age"
            name="age"
            placeholder="Enter your age (must be greater than 18)..."
            required
            type="number"
            min={18}
            value={age}
            onChange={(e) => updateFields({ age: e.target.value })}
            className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
          />
        </label>
        <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
          <span>Address</span>
          <input
            id="address"
            name="address"
            placeholder="Enter your address (Kathmandu-13, Bagmati, Nepal)..."
            type="text"
            required
            value={address}
            onChange={(e) => updateFields({ address: e.target.value })}
            className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
          />
        </label>
        <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
          <span>Gender</span>
          <select
            id="gender"
            name="gender"
            required
            value={gender}
            onChange={(e) => updateFields({ gender: e.target.value })}
            className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
          >
            <option value="male" className="text-teal font-bold">
              Male
            </option>
            <option value="female" className="text-teal font-bold">
              Female
            </option>
            <option value="other" className="text-teal font-bold">
              Other
            </option>
          </select>
        </label>
      </div>
    </FormWrapper>
  );
}
