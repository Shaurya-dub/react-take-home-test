import { IContact, apiDeleteContact, apiUpdateContact } from "../data/contacts";
import { useState } from "react";
import "../ContactCard.css";
type deleteProps = {
  deleteContact: (id: string) => Promise<void>;
  contact: IContact;
};

function ContactCard(contactObj: deleteProps) {
  const { contact, deleteContact } = contactObj;
  const [inputVal, setInputVal] = useState(contact);
  const [contactInfo, setContactInfo] = useState(contact);
  const [editing, setEditing] = useState(false);
  //   let editing = false;
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputVal((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    inputVal.id = contact.id;
    setInputVal(inputVal);
    await apiUpdateContact(inputVal).catch((e) => {
      console.error("something went wrong", e);
    });
    setContactInfo(inputVal);
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    setInputVal(contact);
  };
  return (
    <div className="contactCard">
      <button
        onClick={() => {
          setEditing(true);
        }}
        className="editButton"
      >
        Edit
      </button>
      {editing ? (
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="contactName">Name</label>
          <input
            name="name"
            type="text"
            value={inputVal.name}
            onChange={handleChange}
          />
          <label htmlFor="contactPhone">Phone</label>
          <input
            name="phone"
            type="text"
            value={inputVal.phone}
            onChange={handleChange}
          />
          <label htmlFor="contactAge">Age</label>
          <input
            name="age"
            type="number"
            value={inputVal.age}
            onChange={handleChange}
          />
          <label htmlFor="contactEmail">Email</label>
          <input
            name="email"
            type="email"
            value={inputVal.email}
            onChange={handleChange}
          />
          <div className="buttonHolder">
            <button type="submit">Submit</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <h2>{contactInfo.name}</h2>
          <div className="details">
            <p>Age: {contactInfo.age}</p>
            <p>Phone: {contactInfo.phone}</p>
            <p>Email: {contactInfo.email}</p>
          </div>

          <button
            onClick={async () => {
              await deleteContact(contactInfo.id)
              .catch((e) => {
                console.error('soemthing went wrong', e)
              })
            }}
            className="deleteButton"
          >
            Delete Contact
          </button>
        </>
      )}
    </div>
  );
}

export default ContactCard;
