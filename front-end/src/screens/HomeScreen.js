import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAcion";
import Loader from "../loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

// import products from "../products";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // basicly this line under my comm and connect is returned same value
  // they both getting value from reducer state.value

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h3>Latest Products </h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} lg={4} md={6} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

// const mapStateToProps = (state) => ({
// this conect i used useSelector this tme so look up under the useEfect
// so no need connect function
//   products: state.productList.products,
// });

export default HomeScreen;
