import React, { ChangeEvent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editContact } from "../../redux/contacts/contactsSlice";
import { Contact } from "../../redux/types";
import { RootState } from "../../redux/store";
import StackedInput from "../../components/Form/StackedInput";
import StackedRadioBtn from "../../components/Form/StackedRadioBtn";
import { RadioGroup } from "../../components/contacts/ContactForm";
import { updateContact, viewSpecificContact } from "../../api/api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const EditContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const queryClient = useQueryClient();
  const viewContactMutation = useMutation(viewSpecificContact, {
    onSuccess: (data) => {
      setName(data.data.contact);
      setRadioGroup({
        selectedValue: data.data.contact.status,
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]
      })
    },
    onError: () => {
      setName("");
    }
  });

  const updateContactMutation = useMutation(updateContact, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('contacts');
      toast.success("Updated Successfully");
      window.location.href= "/"
    },
    onError: () => {
      setName("");
      toast.error("Something went wrong");
    }
  });


  const [name, setName] = useState<any>(
    {
      firstName: "",
      lastName: "",
    }
  );

  const [radioGroup, setRadioGroup] = useState<RadioGroup>({
    selectedValue: "",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = event.target;
    setName((prevName: any) => ({
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

  const handleSave = async() => {
    if (name && id) {
      const updatedContact = {
        id: id,
        firstName: name.firstName,
        lastName: name.lastName,
        status: radioGroup.selectedValue
      };
     await updateContactMutation.mutateAsync(updatedContact)
    
    }
  };

  useEffect(() => {
    if (id) {
      viewContactMutation.mutate(id);
    }
  }, [id])

  if (!name) {
    return <div>Contact not found</div>;
  }

  return (
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
              {radioGroup?.options?.map((option,i) => (
                <div className="flex items-center gap-x-3" key={i}>
                  <StackedRadioBtn
                    labelname={option.label}
                    radioFor="status"
                    handleRadioChange={handleRadioChange}
                    checked={radioGroup.selectedValue === option.value}
                    value={option.value}
                  />
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="w-40 px-4 py-2 bg-slate-800 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Edit Contact
      </button>
    </div>
  );
};

export default EditContactPage;