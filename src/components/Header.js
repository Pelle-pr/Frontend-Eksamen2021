import "../styles/App.css";
import "../styles/Navbar.css";
import React, { useState } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Login } from "./Login";
import Home from "./Home";
import Admin from "./Admin";
import Register from "./Register";
import NoMatch from "./NoMatch";
import PrivateRoute from "./PrivateRoute";
import AddContact from "./AddContact";
import Contacts from "./Contacts";
import Edit from "./EditContact";

export default function Header({
  isLoggedIn,
  setLoginStatus,
  loginMsg,
  handleLogin,
  showLogin,
  handleRegister,
  showRegister,
  logout,
}) {
  let user = isLoggedIn ? `Logged in as: ${localStorage.getItem("user")}` : "";
  let roles = isLoggedIn ? `Roles: ${localStorage.getItem("roles")}` : "";

  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/add-contact">
            Add Contact
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/all-contacts">
            All Contacts
          </NavLink>
        </li>
        {isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/example">
                Example
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/students">
                Students
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {roles.includes("admin") && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/admin">
                Admin
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {!isLoggedIn ? (
          <React.Fragment>
            <Nav.Item>
              <button className="navButton" onClick={handleLogin}>
                {loginMsg}
              </button>
              <Login
                handleShowLogin={handleLogin}
                showLogin={showLogin}
                isLoggedIn={isLoggedIn}
                setLoginStatus={setLoginStatus}
              />
            </Nav.Item>
            <Nav.Item>
              <button className="navButton" onClick={handleRegister}>
                Register
              </button>
              <Register
                handleShowRegister={handleRegister}
                showRegister={showRegister}
              />
            </Nav.Item>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Nav.Item>
              <button className="navButton" onClick={logout}>
                {loginMsg}
              </button>
            </Nav.Item>
            <Nav.Item style={{ float: "right", color: "white" }}>
              {user}
              <br></br>
              {roles}
            </Nav.Item>
          </React.Fragment>
        )}
      </ul>

      <Switch>
        {/* for deployment */}
        <Route path="/2021">
          <Redirect to="/" />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>

        <PrivateRoute path="/admin" isLoggedIn={isLoggedIn} component={Admin} />
        <Route path="/add-contact">
          <AddContact />
        </Route>
        <Route path="/all-contacts">
          <Contacts />
        </Route>
        <Route path="/edit/:id">
          <Edit />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}
