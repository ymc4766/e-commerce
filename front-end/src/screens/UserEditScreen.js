import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { USER_UPDATE_RESET } from "../actions/types";

import { getUserDetails, updateUserInfo } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../loader";
import Message from "../Message";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    // user: updateUser,
    loading: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, history, userId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    //user UPDATE DISPATCH

    dispatch(updateUserInfo({ _id: userId, name, email, isAdmin }));
  };

  return (
    <FormContainer>
      <LinkContainer to="admin/userlist" className="bnt btn-light my-3">
        <h3>Go User List </h3>
      </LinkContainer>
      <h1>Update/Edit User Info </h1>
      {successUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>display name </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter your email ?"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary" className="pt2">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default UserEditScreen;
