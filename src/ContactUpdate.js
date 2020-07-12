import React, { useEffect, useState } from "react";
import { useContactContext } from "./ContactProvider";
import "./ContactForm.css";
import { useHistory } from "react-router-dom";

const ContactUpdate = (props) => {
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const { contacts, updateContact } = useContactContext();
  const history = useHistory();

  useEffect(() => {
    const selcon = contacts.filter(
      (cont) => cont.id === props.match.params.id
    )[0];
    if (selcon != null) {
      setContact(selcon);
    }
  }, [props.match.params.id, contacts]);

  const updateValue = (e) => {
    e.persist();
    setContact({ ...contact, [e.target.id]: e.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    updateContact(
      props.match.params.id,
      contact.name,
      contact.email,
      contact.phone
    );
    history.push("/");
  };

  return (
    <>
      {contact.id ? (
        <div className="sectionDiv">
          <form onSubmit={submit} className="contact-form">
            <label htmlFor="email">Name:</label>
            <br></br>
            <input
              id="name"
              maxLength="50"
              value={contact.name}
              onChange={updateValue}
              type="text"
              placeholder="Please enter name..."
              required
            />
            <br></br>
            <label htmlFor="email">Email:</label>
            <br></br>
            <input
              id="email"
              value={contact.email}
              onChange={updateValue}
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              maxLength="50"
              placeholder="Please enter email..."
              required
            />
            <br></br>
            <label htmlFor="phone">Phone:</label>
            <br></br>
            <input
              id="phone"
              value={contact.phone}
              onChange={updateValue}
              type="tel"
              pattern="[789][0-9]{9}"
              placeholder="Please enter phone..."
              required
            />
            <br></br>
            <br></br>
            <button className="update-button">Update Contact</button>
          </form>
        </div>
      ) : (
        <div className="sectionDiv"> Contact not found</div>
      )}
    </>
  );
};

export default ContactUpdate;
