import React, { ChangeEvent } from "react";
import RadioBtn from "./RadioBtn";
import Label from "./Label";

type StackedRadioBtnProp = {
  labelname: string;
  htmlFor?: string;
  radioFor: string;
  handleRadioChange:(event: ChangeEvent<HTMLInputElement>) => void;
  checked:boolean;
  value:string;
};

const StackedRadioBtn: React.FC<StackedRadioBtnProp> = ({
  labelname,
  radioFor,
  handleRadioChange,
  checked,
  value
}) => {
  return (
    <>
      <RadioBtn {...{ radioFor,handleRadioChange, checked,value }} />
      <Label {...{ labelname }} />
    </>
  );
};

export default StackedRadioBtn;
