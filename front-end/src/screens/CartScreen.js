import Button from "@restart/ui/esm/Button";
import React, { useEffect } from "react";
import {
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ history, match, location }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  //   const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //   console.log("qty ", qty);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //   console.log("item", cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    history.push("/login?redirct=shipping");
  };

  return (
    <div>
      <Row>
        <Col>
          {cartItems.length === 0 ? (
            <h3>
              Your cart is empty <Link to="/">Go Back</Link>
            </h3>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((nums) => (
                          <option key={nums + 1} value={nums + 1}>
                            {nums + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Sub TOtal (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                TOTal $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn block w-100 white  bg-black "
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
