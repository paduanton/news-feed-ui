import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import Badge from 'react-bootstrap/Badge';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';

import UserService from "../services/user.service";

const Profile = () => {
  const [userData, setUserData] = useState({});

  const { user: authenticatedUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await UserService.getUser(authenticatedUser.userId)
      
      setUserData(userData);
    }

    fetchUserData();
  }, []);

  if (!authenticatedUser) {
    return <Navigate to="/login" />;
  }

  return (
      <div>
        <h1>
          {userData.name}
        </h1>
        <Tabs
          defaultActiveKey="info"
          id="profile-tab"
          className="mb-3"
        >
          <Tab eventKey="info" title="Info">
          <ListGroup variant="flush">
            <ListGroup.Item>Username:  {userData.name}</ListGroup.Item>
            <ListGroup.Item>Email:  {userData.email}</ListGroup.Item>
            <ListGroup.Item>Joined at  {userData.createdAt}</ListGroup.Item>
          </ListGroup>
          </Tab>
        </Tabs>
    </div>
        
  );
};

export default Profile;
