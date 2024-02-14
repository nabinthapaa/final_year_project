export type AccountData = {
  email: string;
  password: string;
  repassword: string;
  image: File | null;
};

export type DoctorTechnicalData = {
  qualification: string;
  specialization: string;
  experience: string;
  department: string;
  hospital?: string;
};

export type DoctorDocs = {
  citizenship: number | undefined;
  citizenship_id: File | null;
  nmc_no: number | undefined;
  nmc_certificate: File | null;
};

export type UserData = {
  firstName: string;
  lastName: string;
  age: string;
  password: string;
  gender: string;
  address: string;
};

export type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};

export type DoctorTechnicalProps = DoctorTechnicalData & {
  updateFields: (fields: Partial<DoctorTechnicalData>) => void;
};

export type DoctorDocsProps = DoctorDocs & {
  updateFields: (fields: Partial<DoctorDocs>) => void;
};

export type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export type UserFormData = UserData & AccountData;
export type DoctorFormData = UserData &
  AccountData &
  DoctorTechnicalData & { docs: DoctorDocs };
