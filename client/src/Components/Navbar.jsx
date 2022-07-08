import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../app.css";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ fontSize: "7px", marginLeft: "10px" })}
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  margin-left: 25px;
  padding: 5px;
  align-items: center;
  ${mobile({ marginLeft: "10px", marginRight: "12px" })}
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  
  &:focus{
    outline:none;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h2`
  font-weight: 800;
  ${mobile({ fontSize: "10px", marginLeft: "20px" })}
  ${tablet({
    fontSize: "20px",
    justifyContent: "center",
    display: "flex",
    marginLeft: "40px",
  })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center", marginRight: "10px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>

          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "grey", fontSize: "16px" }} />
          </SearchContainer>
        </Left>

        <Center>
          <Logo>
            <Link to="/" style={{ color: "black" }}>
              THEINSIGHTS MALL
            </Link>
          </Logo>
        </Center>

        <Right>
          {user.username ? (
            <>
              <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
              <div style={{display:'flex', alignItems:'center'}}>
                <img
                  src={user.avatar}
                  alt=""
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginLeft:'10px',
                    marginRight: '5px',
                  }}
                />
               <span className='navbar' style={{fontSize:'14px'}}> {user.username} </span>
              </div>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to="/register">REGISTER</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login">SIGN IN</Link>
              </MenuItem>
            </>
          )}

          <MenuItem>
            <Link to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined color="action" />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
