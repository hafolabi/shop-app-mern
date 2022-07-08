import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { tablet } from "../responsive";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 26px;
  margin-top: 17px;
  color: gray;
  justify-content: center;
  display: flex;
  align-items: center;
  ${tablet({ fontSize: "30px" })}
`;
// MAIN COMPONENT FOR ALL PRODUCT OUTPUTING

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:3001/api/products?category=${cat}`
            : "http://localhost:3001/api/products"
        );
        // cat
        //     ? `http://54.89.199.107:6389/api/products?category=${cat}`
        //     : "http://54.89.199.107:6389/api/products"
        
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <Title>{!cat ? (<span>NEW IN STOCK</span>) : ''}</Title>

      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
          : products.slice(0, 8).map((item) => <Product item={item} key={item._id} />)}
      </Container>
    </>
  );
};

export default Products;
