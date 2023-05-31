import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { Contact } from "../../redux/types";
import { RootState } from "../../redux/store";
import { useMutation } from "react-query";
import { viewSpecificContact } from "../../api/api";
const ViewContact = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<any>({})
  const navigate = useNavigate();


  const viewContactMutation = useMutation(viewSpecificContact, {
    onSuccess: (data) => {
      setContact(data.data.contact)
    },
  });
  // const contacts = useSelector<RootState, Contact[]>(
  //   (state) => state.contacts.contacts
  // );
  // const contact = contacts.find((c) => c.id === id);
  useEffect(() => {
    if (id) {

      viewContactMutation.mutate(id);
    }
  }, [id])
  if (!contact) {
    return <div>Contact not found</div>;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white rounded-lg shadow-xl p-6">
        <header className="text-3xl font-bold py-4 text-center">User Information</header>
        <div className="my-4">
          <ul className="text-gray-700 font-semibold">
            <li className="py-2">
              <span className="text-gray-500 mr-2">Id:</span>
              {contact._id}
            </li>
            <li className="py-2">
              <span className="text-gray-500 mr-2">First name:</span>
              {contact.firstName}
            </li>
            <li className="py-2">
              <span className="text-gray-500 mr-2">Last name:</span>
              {contact.lastName}
            </li>
            <li className="py-2">
              <span className="text-gray-500 mr-2">Status:</span>
              {contact.status}
            </li>
          </ul>
        </div>
        <footer className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </footer>
      </div>
    </div>


  );
};

export default ViewContact;