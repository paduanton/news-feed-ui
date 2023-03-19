import React, { useState, useEffect }  from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import { login } from "../actions/auth";
import { CLEAR_MESSAGE } from "../actions/types";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAlertModal, setShowAlertModal] = useState(false);

  const { message } = useSelector(state => state.message);
  const { isLoggedIn } = useSelector(state => state.auth);

  const handleLogin = (event) => {
    event.preventDefault();
    
    const { email, password, rememberMe } = event.target; 

    dispatch(
      login(
        email.value.trim(),
        password.value.trim(),
        rememberMe.checked
      )
    ).then(() =>{
      navigate("/feed")
    });
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

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <Form onSubmit={handleLogin}>
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

export default Login;
