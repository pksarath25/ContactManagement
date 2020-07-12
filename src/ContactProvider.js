import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "promise-polyfill/src/polyfill";

var data = [];

const Base_Api = "http://localhost:8080";
const ContactContext = createContext();
export const useContactContext = () => useContext(ContactContext);

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState(data);
  Axios.defaults.headers["Pragma"] = "no-cache"; //To prevent caching issue in IE

  useEffect(() => {
    BindContacts();
  }, []);

  const ShowToast = (msg, type) => {
    const toastsetting = {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    switch (type) {
      case "success":
        toast.success(msg, toastsetting);
        break;
      case "error":
        toast.error(msg, toastsetting);
        break;
      default:
        toast.info(msg, toastsetting);
    }
  };

  const deleteContact = (contactid) => {
    confirmAlert({
      title: "",
      message: "Are you sure to delete contact?",
      buttons: [
        {
          label: "Delete",
          onClick: () =>
            Axios.delete(`${Base_Api}/contact/${contactid}`)
              .then(() => {
                BindContacts();
                ShowToast("Contact deleted !", "success");
              })
              .catch((err) => {
                ShowToast("Contact deletion failed !", "error");
              }),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const BindContacts = () => {
    Axios.get(`${Base_Api}/contact`)
      .then((result) => {
        setContacts(result.data);
      })
      .catch((err) => {
        ShowToast("Contact fetch failed !", "error");
      });
  };

  const addContact = (name, email, phone) => {
    const newContact = {
      name,
      email,
      phone,
    };

    Axios.post(`${Base_Api}/contact`, newContact)
      .then((result) => {
        const newContact = result.data;
        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
        ShowToast("Contact added !", "success");
      })
      .catch((err) => {
        ShowToast("Contact add failed !", "error");
      });
  };

  const updateContact = (id, name, email, phone) => {
    const newContact = {
      name,
      email,
      phone,
    };

    Axios.put(`${Base_Api}/contact/${id}`, newContact)
      .then((result) => {
        BindContacts();
        ShowToast("Contact updated !", "success");
      })
      .catch((err) => {
        ShowToast("Contact update failed !", "error");
      });
  };



  return (
    <ContactContext.Provider
      value={{
        contacts,
        deleteContact,
        addContact,
        updateContact
      }}
    >
      {children}
      <ToastContainer />
    </ContactContext.Provider>
  );
};

export default ContactProvider;
