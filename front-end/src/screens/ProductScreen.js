// import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productAcion";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types";
import Rating from "../components/Rating";
import Loader from "../loader";
import Message from "../Message";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // fetching this line from DB
  /// const product = products.find((product) => product._id === match.params.id);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorReview, success: successReview } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successReview) {
      alert("successfully added comment");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview]);

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=${qty}`);
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <div>
      <Link to="/" className="btn blue bg-light mr3 my-3">
        Go Home
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup varient="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>price : {product.price}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup varient="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col> Price :</Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col> status :</Col>
                      <Col>
                        {product.countInStock > 0
                          ? "in Stock "
                          : "out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>QTY </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (nums) => (
                                <option key={nums + 1} value={nums + 1}>
                                  {nums + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn block w-100 "
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3> Reviews</h3>
              {product.reviews.length === 0 && <Message>NO Reviews </Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <Row>
                      <Col>
                        <strong>{review.name}</strong>
                      </Col>
                      <Col>
                        <p>{review.createdAt.substring(0, 10)}</p>
                      </Col>
                      <strong> {review.comment}</strong>
                      <Rating value={review.rating} />
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h6>Write A customer Review</h6>

                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlid="rating">
                        <Form.Label>Give Rating 1 to 5</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">select ...</option>
                          <option value="1">1 - Poor </option>
                          <option value="2">2 - Fair </option>
                          <option value="3">3 - Good </option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Awesome</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit">Comment</Button>
                    </Form>
                  ) : (
                    <h3>
                      please <Link to="/login">Sign In</Link>
                      to review
                    </h3>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
