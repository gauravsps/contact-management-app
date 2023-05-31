import React from "react";
import { useNavigate } from "react-router-dom";
import ContactsList from "../../components/contacts/ContactsList";

const ContactPage = () => {
  const navigate = useNavigate();
  return (
    <div className="my-8">
      <div className="display flex justify-between ">

      <h1 className="text-3xl font-bold mb-4">Contact Page</h1>
      <button
        onClick={() => navigate("/new-contact")}
        className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create Contact
      </button>
      </div>
      <br />
      <ContactsList />
    </div>
  );
};

export default ContactPage;
