import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addContact } from "../../redux/contacts/contactsSlice";
import { Contact } from "../../redux/types";
import StackedInput from "../Form/StackedInput";
import StackedRadioBtn from "../Form/StackedRadioBtn";
import { useMutation, useQueryClient } from "react-query";
import { createContact } from '../../api/api';
import { toast } from "react-toastify";
export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroup {
  selectedValue: string;
  options: RadioOption[];
}

const ContactForm: React.FC = () => {
  const queryClient = useQueryClient();
  const addContactMutation = useMutation(createContact, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('contacts');
      setName({
        firstName: "",
        lastName: "",
      });
      toast.success("Contact added");
     window.location.href= "/"
    },
    onError: (err:any) => {
      toast.error(err?.message);
    }
  });
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });

  const [radioGroup, setRadioGroup] = useState<RadioGroup>({
    selectedValue: "",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.firstName && !name.lastName) return;
    const newContact = {
      firstName: name.firstName,
      lastName: name.lastName,
      status: radioGroup.selectedValue
    };
    addContactMutation.mutate(newContact);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = event.target;
    setName((prevName) => ({
      ...prevName,
      [inputName]: value,
    }));
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRadioGroup((prevGroup) => ({
      ...prevGroup,
      selectedValue: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <StackedInput
                name="firstName"
                value={name.firstName}
                onChange={handleChange}
                labelname="First Name"
              />
            </div>
            <div className="sm:col-span-3">
              <StackedInput
                name="lastName"
                value={name.lastName}
                onChange={handleChange}
                labelname="Last Name"
              />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Status
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                User Status
              </p>
              <div className="mt-6 space-y-6">
                {radioGroup?.options?.map((option) => (
                  <div className="flex items-center gap-x-3">
                    <StackedRadioBtn
                      labelname={option.label}
                      radioFor="status"
                      handleRadioChange={handleRadioChange}
                      checked={radioGroup.selectedValue === option.value}
                      value={option.value}
                    />
                  </div>
                ))}

                {/* <div className="flex items-center gap-x-3">
                  <StackedRadioBtn labelname="Inactive" radioFor="status" />
                </div> */}
              </div>
            </fieldset>
          </div>
        </div>
        <button
          type="submit"
          className="w-40 px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;