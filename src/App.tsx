import React from "react";
import ContactForm from "./components/ContactForm";
import ContactCard from "./components/ContactCard";
import {
  apiFetchAllContacts,
  apiDeleteContact,
  apiAddContact,
  IContact,
} from "./data/contacts";

import { useState, useEffect } from "react";

function App() {
  const [allContacts, setAllContacts] = useState<IContact[]>([]);

  const deleteContact = async (id: string) => {
    await apiDeleteContact(id);
    setAllContacts(allContacts.filter((contact) => contact.id !== id));
  };

  const addContact = async (contacts: IContact) => {
    await apiAddContact(contacts);
    const newContactList = [...allContacts];
    newContactList?.push(contacts);
    setAllContacts(newContactList);
  };

  const sortFunc = (arr: IContact[]) => {
    const a = [...arr];
    a.sort((a: IContact, b: IContact) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      else return 1;
    });
    return a;
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await apiFetchAllContacts();
      setAllContacts(data);
    };
    fetchContacts().catch((e) => {
      console.error("something went wrong", e);
    });
  }, []);

  return (
    <div className="App container">
      <ContactForm addContact={addContact} />
      <div className="contactListHolder">
        <div className="contactList">
          {sortFunc(allContacts).map((contact: IContact) => {
            return (
              <ContactCard
                key={contact.id}
                contact={contact}
                deleteContact={deleteContact}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
