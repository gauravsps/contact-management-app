import React from "react";

type LabelProps = {
  labelname: string;
  htmlFor?: string;
};
const Label: React.FC<LabelProps> = ({ htmlFor, labelname }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {labelname}
    </label>
  );
};

export default Label;
