import React from "react";
import { useHistory } from "react-router-dom";
import { useContactContext } from "./ContactProvider";
import { useInput } from "./hooks";
import "./ContactForm.css";

const ContactForm = () => {
  const [name, updateName, resetName] = useInput("");
  const [phone, updatePhone, resetPhone] = useInput("");
  const [email, updateEmail, resetEmail] = useInput("");

  const { addContact } = useContactContext();

  const history = useHistory();

  const submit = (event) => {
    event.preventDefault();
    addContact(name, email, phone);
    resetName();
    resetPhone();
    resetEmail();
    history.push("/");
  };

  return (
    <>
      <div className="sectionDiv">
        <form onSubmit={submit} className="contact-form">
          <label htmlFor="email">Name:</label>
          <br></br>
          <input
            id="name"
            value={name}
            onChange={updateName}
            type="text"
            maxLength="50"
            placeholder="Please enter name..."
            required
          />

          <br></br>
          <label htmlFor="email">Email:</label>
          <br></br>
          <input
            id="email"
            value={email}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            maxLength="50"
            onChange={updateEmail}
            placeholder="Please enter email..."
            required
          />
          <br></br>

          <label htmlFor="phone">Phone:</label>
          <br></br>
          <input
            id="phone"
            value={phone}
            onChange={updatePhone}
            type="tel"
            pattern="[789][0-9]{9}"
            placeholder="Please enter phone..."
            required
          />
          <br></br>
          <br></br>
          <button className="add-button">Add Contact</button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
