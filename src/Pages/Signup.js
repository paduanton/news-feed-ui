import React, { useState, useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import { signup } from "../actions/auth";
import { CLEAR_MESSAGE } from "../actions/types";

const Signup = () => {
  const dispatch = useDispatch();

  const [showAlertModal, setShowAlertModal] = useState(false);

  const { message } = useSelector(state => state.message);

  const handleSignup = (event) => {
    event.preventDefault();
    
    const { name, username, email, password, rememberMe } = event.target; 

    dispatch(
      signup(
        name.value.trim(), 
        username.value.trim(),
        email.value.trim(),
        password.value.trim(),
        rememberMe.checked
      )
    );
  };

  useEffect(() => {
    if (!showAlertModal) {
      dispatch({ type: CLEAR_MESSAGE });
    }

  }, [showAlertModal, dispatch]);

  useEffect(() => {
    if (message) {
      setShowAlertModal(true) 
    }

  }, [message]);
  
  return (
    <>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rememberMe">
          <Form.Check type="checkbox" name="rememberMe" label="Stay signed-in?" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Confirm
        </Button>
    </Form>

      <Modal show={showAlertModal} onHide={() =>setShowAlertModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Oh! Something went wrong!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger" >
              {message}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlertModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  );
};

export default Signup;
