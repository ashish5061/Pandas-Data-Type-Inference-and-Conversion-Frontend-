interface Option {
  value: string;
  label: string;
}

export const colorOptions: Option[] = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
];

export const dataTypeOptions = [
    { value: "str", label: "String" },
    { value: "number", label: "Number" },
    { value: "bool", label: "Boolean" },
    { value: "complex", label: "Complex" },
    { value: "mixed", label: "Mixed" },
    { value: "date", label: "Date" },
    { value: "datetime", label: "Date Time" },
  ];
