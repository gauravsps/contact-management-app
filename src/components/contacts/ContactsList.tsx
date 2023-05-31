import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Contact } from "../../redux/types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addContact, setContactId, setShowModal } from "../../redux/contacts/contactsSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteContact, fetchContacts } from "../../api/api";
import Modal from "../Modal";
const ContactsList: React.FC = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError } = useQuery('contacts', fetchContacts, {
    staleTime: 1000,
    onSuccess: (data) => {
      dispatch(addContact(data.data.contacts));// Dispatch contacts to Redux store
    },
  });

  const deleteContactMutation = useMutation(deleteContact, {
    onSuccess: () => {
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries('contacts');
    },
  });
  const selector: any = useSelector<RootState>(
    (state) => state.contacts
  );

  const contacts = selector.contacts
  const showModal = selector.showModal
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteContactHandler = (id: string) => {
    deleteContactMutation.mutate(id);
    dispatch(setShowModal(false))
  };

  const viewContactHandler = (id: string) => {
    navigate(`/contacts/${id}`);
  };

  const editContactHandler = (e:any,id: string) => {
    e.stopPropagation();
    navigate(`/contacts/${id}/edit`);
  };

  if (contacts.length === 0) {
    return (<div className="flex items-center justify-center h-full">
      <p className="text-gray-500 text-xl">No Contact found, please create new contact from create contact button</p>
    </div>)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {contacts.map((contact: any) => (
        <div
          key={contact._id}
          className="py-4 px-6 border border-gray-300 rounded-lg shadow-md flex flex-col justify-between cursor-pointer"
          onClick={() => viewContactHandler(contact._id)}
        >
          <div className="flex items-center justify-center mb-4">
            <img
              src={'https://placehold.co/100'}
              alt=""
              className="rounded-full"
            />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-center">First Name: {contact.firstName}</h2>
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => editContactHandler(e,contact._id)}
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={(e) => {e.stopPropagation(); dispatch(setShowModal(true)); dispatch(setContactId(contact._id))}}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {showModal && <Modal heading="Are you sure you want to delete?" cb={deleteContactHandler} />}
    </div>

  );
};

export default ContactsList;
