import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../types";

interface ContactsState {
  contacts: Contact[];
  showModal: boolean;
  contactId:string;
  navOpen:boolean;
}

const initialState: ContactsState = {
  contacts: [],
  showModal: false,
  contactId:"",
  navOpen: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = [...action.payload];
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const { _id } = action.payload;
      const existingContact = state.contacts.find(
        (contact) => contact._id === _id
      );
      if (existingContact) {
        Object.assign(existingContact, action.payload);
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
    },
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setContactId:(state, action: PayloadAction<string>) => {
      state.contactId = action.payload;
    },
    setNavOpen:(state, action: PayloadAction<boolean>) => {
      state.navOpen= action.payload;
    },
  },
});

export const { addContact, editContact, deleteContact, setShowModal,setContactId,setNavOpen } =
  contactsSlice.actions;

export default contactsSlice.reducer;
