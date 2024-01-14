export const PersonalInputs = [
  {
    label: "Name",
    id: "name",
    type: "text",
    placeholder: "Enter full name here...",
    required: true,
  },
 
  {
    label: "Age",
    id: "age",
    type: "number",
    placeholder: "Enter Age here...",
    required: true,
    min: 18,
  },
  {
    label: "Phone",
    id: "phone",
    type: "tel",
    placeholder: "Enter Phone Number here...",
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  {
    label: "Date of Birth",
    id: "dob",
    type: "date",
    placeholder: "Enter Date here",
    required: true,
  },
  
];
