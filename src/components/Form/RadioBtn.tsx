import React, { ChangeEvent } from "react";
type RadioType = {
  radioFor: string;
  value: string;
  handleRadioChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean
};
const RadioBtn: React.FC<RadioType> = ({ radioFor, handleRadioChange, value, checked }) => {
  return (
    <input
      name={radioFor}
      type="radio"
      value={value}
      checked={checked}
      onChange={handleRadioChange}
      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
    />
  );
};

export default RadioBtn;
