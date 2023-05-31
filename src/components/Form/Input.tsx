import React, { ChangeEvent } from "react";
type InputProp = {
  name: string;
  placeHolder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const Input: React.FC<InputProp> = ({ name, placeHolder, value, onChange }) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      required
      className="block w-full rounded-md border-0 p-[10px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  );
};

export default Input;
