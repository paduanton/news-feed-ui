import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";

import { logout } from "./actions/auth";


const App = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const redirectTo = (url) => {
    window.location.assign(url);
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">News Feed App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {isLoggedIn ? (
            <>
              <Button variant="light" onClick={() => redirectTo("/profile")}>Profile</Button>
              {' '}
              <Button variant="light" onClick={() => logOut()}>Logout</Button>
            </>
            ) : (
              <>
               <Button variant="light" onClick={() => redirectTo("/login")}>Login</Button>
                {' '}
                <Button variant="light" onClick={() => redirectTo("/signup")}>Signup</Button>
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
