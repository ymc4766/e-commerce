import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { listProductDetails, UpdateProduct } from "../actions/productAcion";
import { PRODUCT_UPDATE_RESET } from "../actions/types";
import FormContainer from "../components/FormContainer";
import Loader from "../loader";
import Message from "../Message";

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  //phot upload state
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    success: successUpdate,
    loading: loadingUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setBrand(product.brand);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, successUpdate, history, product, productId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // UPDATE Product
    dispatch(
      UpdateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        countInStock,
        category,
        brand,
      })
    );
  };

  return (
    <FormContainer>
      <LinkContainer to="/admin/productlist" className="bnt btn-light my-3">
        <h3>
          <i className="fas fa-arrow-left" />
          GO BACK
        </h3>
      </LinkContainer>
      <h1>Edit PRODUCT </h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger"> {errorUpdate}</Message>}
      {successUpdate && <Message variant="success">{successUpdate}</Message>}

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

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="enter price "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>description</Form.Label>
            <Form.Control
              type="description"
              placeholder="enter your description ?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>

            <Form.Control
              controlId="uploadImage"
              type="file"
              label="choose file"
              custom
              id="image-file"
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>YOUR BRAND </Form.Label>
            <Form.Control
              type="text"
              placeholder="what is ur brand?"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Coount in stock</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="pt2">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
}

export default ProductEditScreen;
