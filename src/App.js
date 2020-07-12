import React from "react";
import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom";
import ContactProvider from "./ContactProvider";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import ContactUpdate from "./ContactUpdate";
import NotFound from "./NotFound";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ContactProvider>
      <Router>
        <div className="outerDiv">
          <nav>
            <ul>
              <li>
                <NavLink exact to="/">
                  Contact List
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/add">
                  Add Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/add" component={ContactForm} />
            <Route exact path="/edit/:id" component={ContactUpdate} />
            <Route exact path="/" component={ContactList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </ContactProvider>
  );
}

export default App;
