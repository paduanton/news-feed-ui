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
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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
    const preferenceHasKeyWord = feedPreferencesData.some((item) => item.type === 'keyword');

    if(preferenceHasKeyWord) {
      dispatch({
        type: SET_MESSAGE,
        payload: 'You already provided a keyword!',
      });

      return false;
    }

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
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Filter:</Form.Label>
            <Form.Control type="text" name="content" placeholder="Enter a keyword, author, source or category" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="type">
          <Form.Label>Filter type:</Form.Label>
            <Form.Select name="type" aria-label="filter type">
              <option value="keyword">keyword</option>
              <option value="author">author</option>
              <option value="source">source</option>
              <option value="category">category</option>
            </Form.Select>
          </Form.Group>
        </Col>

          <Col xs="auto">
            <Button variant="primary" type="submit">
              Add Filter
            </Button>
          </Col>
        </Row>
      </Form>

      {feedPreferencesData && feedPreferencesData.map((feedPreference, index) => (
        <Badge key={`content-${feedPreference.content}-${index}-feed`}  bg="secondary">
          {feedPreference.content}:{feedPreference.type}
        </Badge>
           
      ))}

      <Col xs="auto">
        <Form.Group className="mb-3" controlId="dateSort">
          <Form.Label>Sort by:</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="keyword">oldest</option>
            <option value="author">newest</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="d-grid gap-2" controlId="formBasicCheckbox">
         <Button type="button">
          Search
         </Button>
        </Form.Group>
      </Col>
      
      <Container>
        <Row>
           <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
     
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
