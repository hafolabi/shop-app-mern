import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, clearCart, decreaseCart, getTotals, removeFromCart } from '../redux/cartRedux'
import StripeCheckout from "react-stripe-checkout";
import {userRequest} from "../requestMethod";
import { Link, useHistory } from "react-router-dom";

// const KEY =
//   "pk_test_51K7N0cFdTBZ0dAkuG9MhIQCSkuvC7zFu22mrI9WmMN0lprp4lwKJJPr8LjCSsJUEt7CH7e2R3Q7tbK0mSymh6nN700CNGhDIRU";

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({ fontSize: "10px", display: "flex", flexDirection: "column" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;

  ${mobile({width:'150px'})}
`;

const Details = styled.span`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  ${mobile({fontSize:'12px'})}
`;

const ProductId = styled.span`
${mobile({fontSize:'12px'})}
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor:pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 20px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory()
  const user = useSelector((state)=> state.user.currentUser)

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(()=>{
    dispatch(getTotals())
  },[cart, dispatch])
 
  useEffect(()=>{
    const makeRequest= async ()=>{
      try{
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        })
        history.push("/success", {data:res.data})
        dispatch(clearCart())
      }
      catch{}
    }
    stripeToken && makeRequest();
  },[stripeToken, cart.total, history, dispatch])

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  };

  const handleDecreaseCart=(product)=>{
    dispatch(decreaseCart(product))
  }

  const handleIncreaseCart=(product)=>{
    dispatch(addProduct(product)) 
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>

        <Top>
          <Link to="/products/wears">
          <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>

          <TopTexts>
            <TopText>Shopping Pack(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>

          {user.username ? (
            <>
              <Link to='#'>
              <TopButton type="filled">CHECK OUT NOW</TopButton>
              </Link>
            </>
          ) : (
            <Link to='/login'>
              <TopButton type="filled">LOGIN TO CHECKOUT</TopButton>
              </Link>
          )}
        </Top>

        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}{" "}
                    </ProductSize>
                  </Details>
                </ProductDetail>

                <PriceDetail>

                  <ProductAmountContainer>

                    <Add onClick={()=> handleIncreaseCart(product)}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={()=> handleDecreaseCart(product)} />
                  </ProductAmountContainer>

                  <ProductPrice>
                    ${product.price * product.quantity}
                  </ProductPrice>
                  <div style={{ marginTop: "27px", marginRight:'10px' }}>
                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid teal",
                        cursor: "pointer",
                        color: "teal",
                        padding: 10,
                        marginBottom:'15px',
                      }}
                    >
                      Remove Product
                    </button>
                  </div>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Sub Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$3.00</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-$3.00</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            {user.username ? (
              <StripeCheckout
              name="theinisghts"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECK OUT NOW </Button>
            </StripeCheckout>
            ) : (
              <>
              <Link to='/login'>
              <Button>LOGIN</Button>
              </Link>
              </>
            )
            }
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
