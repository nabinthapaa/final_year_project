import { AccountFormProps } from "../types/FormTypes";
import { FormWrapper } from "./FormWrapper";

export function AccountForm({
  email,
  password,
  repassword,
  updateFields,
}: AccountFormProps) {
  return (
    <FormWrapper title="Account Credentials">
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
        <span>Email</span>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter your email..."
          required
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
        <span>Password</span>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter a new password..."
          required
          value={password}
          onChange={(e) => updateFields({ password: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
      <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent w-full">
        <span>Password</span>
        <input
          id="repassword"
          name="repassword"
          type="password"
          placeholder="Enter the same new password again..."
          required
          value={repassword}
          onChange={(e) => updateFields({ repassword: e.target.value })}
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        />
      </label>
    </FormWrapper>
  );
}
