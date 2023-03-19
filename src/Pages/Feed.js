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
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import { storeFeedPreference, deleteFeedPreference } from "../actions/feed";
import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

import FeedService from "../services/feed.service";
import ArticleService from "../services/article.service";

const Feed = () => {
  const dispatch = useDispatch();

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [feedPreferencesData, setFeedPreferencesData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { user: authenticatedUser, isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector(state => state.message);


  const addFilter = (event) => {
    event.preventDefault();
    
    const { type, content } = event.target; 
    const preferences = feedPreferencesData;
    const preferenceHasKeyWord = preferences.some((item) => item.type === 'keyword');

   
    if(preferenceHasKeyWord && type.value === 'keyword') {

      dispatch({
        type: SET_MESSAGE,
        payload: 'You already provided a keyword!',
      });

      return false;
    }

    preferences.push({ content: content.value, type: type.value});
    
    setFeedPreferencesData(preferences);
  };

  const searchArticles = (event) => {
    event.preventDefault();

    setSearchLoading(true);

    const { dateSort } = event.target; 
    const keyword = feedPreferencesData.find((feedPreference) => feedPreference.type === 'keyword')?.content;
    const categories = feedPreferencesData.filter((feedPreference) => feedPreference.type === 'category').map((item) => {
      return item.content
    });
    const sources = feedPreferencesData.filter((feedPreference) => feedPreference.type === 'source').map((item) => {
      return item.content
    });
    const authors = feedPreferencesData.filter((feedPreference) => feedPreference.type === 'author').map((item) => {
      return item.content
    });

    if(!keyword) {
      dispatch({
        type: SET_MESSAGE,
        payload: 'You need to provide a keyword!',
      });

      setSearchLoading(false)
    } else {
      ArticleService.getArticles(keyword, categories, sources, authors, dateSort.value)
        .then((response) => {
          setArticlesData(response);
        }).finally(() => {
          setSearchLoading(false)
        });
    }
  }

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

  const redirectTo = (url) => {
    window.open(url, '_blank');
  }

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
            <Button variant="secondary" type="submit">
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

      <Col xs="auto" className="mt-2">
        <Form onSubmit={searchArticles}>
          <Form.Group className="mb-3" controlId="dateSort">
            <Form.Label>Sort by:</Form.Label>
            <Form.Select name="dateSort" aria-label="Default select example">
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="d-grid gap-2" controlId="formBasicCheckbox">
          <Button type="submit" disabled={searchLoading}>
            {searchLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> }
            {searchLoading && 'Loading' }
            {!searchLoading && 'Search' }

          </Button>
          </Form.Group>
        </Form>
      </Col>
      
      <Container className="mt-4">
      {articlesData.totalResults && `Total results: ${articlesData.totalResults}`}
        <Row className="d-flex justify-content-center">
        {articlesData ? articlesData.articles?.map((article, index) => (
          <Card key={`card-article-${index}`}style={{ width: '18rem' }} className="pt-4 m-1">
            {article.imageURL && <Card.Img variant="top" src={article.imageURL} />}
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>
                {article.description}
              </Card.Text>
              <ListGroup variant="flush">
                {article.author && <ListGroup.Item>Author: {article.author}</ListGroup.Item>}
                {article.category && <ListGroup.Item>Category: {article.category}</ListGroup.Item>}
                {article.section && <ListGroup.Item>Section: {article.section}</ListGroup.Item>}

                <ListGroup.Item>Source: {article.source}</ListGroup.Item>
                <ListGroup.Item>Published at: {article.publishedAt}</ListGroup.Item>
              </ListGroup>
              <Button variant="primary" onClick={() => redirectTo(article.sourceURL)}>Go to article source page</Button>
            </Card.Body>
          </Card>
        )) : 'No articles to show at this time, please update your filters and try again!'}
           
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
