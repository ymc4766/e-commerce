import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function SearchBox({ history }) {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
    setKeyword("");
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="search Products ...."
        className="mr-sm-2 ml-sm-5"
        autoComplete="off"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="ml2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
