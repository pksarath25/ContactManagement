import React, { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";
import "./ContactList.css";
import { useContactContext } from "./ContactProvider";
import { Link } from "react-router-dom";

const ContactList = () => {
  const { contacts, deleteContact } = useContactContext();

  if (contacts.length) {
    return (
      <>
        <table className="contacts-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>                  
                  <Link to={`/edit/${contact.id}`}>
                    <FaUserEdit
                      className="action-icon editIcon"
                      title="Edit Contact"
                    ></FaUserEdit>
                  </Link>
                </td>
                <td>
                  <BsTrashFill
                    title="Delete Contact"
                    className="action-icon deleteIcon"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </BsTrashFill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return <div className="sectionDiv">No contacts found.</div>;
  }
};

export default ContactList;
