import { apiFetchAllContacts, IContact, apiAddContact } from "../data/contacts";
import { useState, useEffect } from "react";
import { generateUUID } from "../util/guid";
import "../ContactForm.css";
type addContact = {
  addContact: (contacts: IContact) => Promise<void>;
};
function ContactForm(props: addContact) {
  // const {render,setRender} = props
  const { addContact } = props;
  const [inputs, setInputs] = useState({
    id: "",
    name: "",
    phone: "",
    age: 0,
    email: "",
  });
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const contactId = generateUUID();
    inputs.id = contactId;
    setInputs(inputs);
    await addContact(inputs).catch((e) => {
      console.error("something went wrong", e);
    });
    setInputs({
      id: "",
      name: "",
      phone: "",
      age: 0,
      email: "",
    });
  };
  return (
    <>
      <form className="contactForm" action="#" onSubmit={handleSubmit}>
        <label htmlFor="contactName">Name</label>
        <input
          name="name"
          type="text"
          id="contactName"
          value={inputs.name}
          placeholder="Enter Name"
          onChange={handleChange}
          required
        />
        <label htmlFor="contactPhone">Phone</label>
        <input
          name="phone"
          type="text"
          id="contactPhone"
          value={inputs.phone}
          placeholder="Enter Phone Number"
          onChange={handleChange}
          required
        />
        <label htmlFor="contactAge">Age</label>
        <input
          name="age"
          type="number"
          id="contactAge"
          placeholder="Enter Age"
          value={inputs.age === 0 ? "" : inputs.age}
          onChange={handleChange}
          required
        />
        <label htmlFor="contactEmail">Email</label>
        <input
          name="email"
          type="email"
          id="contactEmail"
          placeholder="Enter Email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Contact</button>
      </form>
    </>
  );
}

export default ContactForm;
