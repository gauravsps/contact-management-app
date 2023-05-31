import React, { ChangeEvent } from "react";
import Label from "./Label";
import Input from "./Input";
type StackedInputProps = {
  labelname: string;
  htmlFor?: string;
  name: string;
  placeHolder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const StackedInput: React.FC<StackedInputProps> = ({
  labelname,
  name,
  placeHolder,
  value,
  onChange,
}) => {
  return (
    <>
      <Label labelname={labelname} />
      <div className="mt-2">
        <Input {...{ name, placeHolder, value, onChange }} />
      </div>
    </>
  );
};

export default StackedInput;
