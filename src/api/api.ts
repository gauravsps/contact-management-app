import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

interface ContactData {
  firstName: string;
  lastName: string;
  status: string;
}

interface UpdateContact extends ContactData {
  id:string;
}

export const createContact = async (contactData: ContactData) => {
  const response = await axios.post(`${apiUrl}/contacts`, contactData);
  return response.data;
};

export const fetchContacts = async () => {
  const response = await axios.get(`${apiUrl}/contacts`);
  return response.data;
};

export const deleteContact = async (id: string) => {
  const response = await axios.delete(`${apiUrl}/contacts/delete/${id}`);
  return response.data;
};

export const viewSpecificContact = async (id: string) => {
  const response = await axios.get(`${apiUrl}/contacts/${id}`);
  return response.data;
};

export const updateContact = async (contactData: UpdateContact) => {
  const response = await axios.put(`${apiUrl}/contacts/update`,contactData);
  return response.data;
};
