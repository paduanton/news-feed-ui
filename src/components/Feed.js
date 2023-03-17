import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { storeFeedPreference, deleteFeedPreference } from "../actions/feed";
import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

import FeedService from "../services/feed.service";

const Feed = () => {
  const dispatch = useDispatch();

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [feedPreferencesData, setFeedPreferencesData] = useState([]);

  const { user: authenticatedUser, isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector(state => state.message);


  const addFilter = (event) => {
    event.preventDefault();
    
    const { type, content } = event.target; 
    const preferences = feedPreferencesData;

    preferences.push({ content: content.value, type: type.value});
    
    setFeedPreferencesData(preferences);

    console.log(feedPreferencesData)
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

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <Form onSubmit={addFilter}>
      <Row className="align-items-center">
        <Col xs={4} className="my-1">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Filter:</Form.Label>
            <Form.Control type="text" name="content" placeholder="Enter a keyword, author, source or category" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Filter type:</Form.Label>
            <Form.Select name="type" aria-label="filter type">
              <option value="keyword">keyword</option>
              <option value="author">author</option>
              <option value="source">source</option>
              <option value="category">category</option>
            </Form.Select>
          </Form.Group>
        </Col>
        {/* <Col xs="auto">

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Sort by:</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="keyword">oldest</option>
            <option value="author">newest</option>
          </Form.Select>
        </Form.Group>
        </Col> */}

          <Col xs="auto">
            <Button variant="primary" type="submit">
              Add Filter
            </Button>
          </Col>
        </Row>
      </Form>
      {feedPreferencesData && feedPreferencesData.map((feedPreference, index) => {

        return <>
                <Badge key={`content-${index}`}  bg="secondary">{feedPreference.content}:{feedPreference.type}
                </Badge> <Badge key={`delete-${index}`} bg="danger">X</Badge>{' '}
              </>
      })}
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

export default Feed;
