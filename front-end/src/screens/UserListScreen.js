import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers } from "../actions/userActions";
import Loader from "../loader";
import Message from "../Message";

function UserListScreen({ history }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm("are U SURE DELETE THIS USER ")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>ID</tr>
            <tr>email</tr>
            <tr>name</tr>
            <tr>IsAdmin</tr>
            <tr></tr>
            <tr>ID</tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>{user._id}</th>
                <th>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </th>
                <th>{user.name}</th>
                <th>
                  {user.isAdmin ? "Admin" : <i className="fas fa-close red" />}
                </th>
                <LinkContainer to={`/user/${user._id}/edit`}>
                  <Button variant="light">
                    <i className="fas fa-edit" />
                  </Button>
                  <Button onClick={() => deleteUserHandler(user._id)}>
                    <i className="fas fa-trash red" />
                  </Button>
                </LinkContainer>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;
