import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// ALL PRODUCT COMPONENT PAGE OUTPUTING STRUCTURE

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.7s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

/*const Circle = styled.div`
    width:200px;
    height:200px;
    border-radius: 50%;
    opacity: 0.3;
    background-color: #ebe8e8;
    position: absolute;
`
*/
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 1.8s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Price = styled.div`
  height: 30px;
  font-size: 14px;
  margin-top: 20px;
  color: #706f6f;
`;

const Product = ({ item }) => {
  return (
    <>
      <Container>
        <Image src={item.img} />

        <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>

          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>

          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>

        <Price>
          <span
            style={{
              padding: "10px 20px",
              fontWeight: "800",
              backgroundColor: "white",
            }}
          >
            Price: 
          </span>
          <span style={{ marginLeft: "20px", fontSize: 25 }}>
            $ {item.price}
          </span>
        </Price>
      </Container>
    </>
  );
};

export default Product;
