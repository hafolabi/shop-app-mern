import React from "react";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

const App = () => {
  
  const admin = useSelector((state) => state.user.currentUser.isAdmin);

  return (
    
    <Router>
      <Switch>
        <Route exact path="/login">
        {admin ? <Redirect to="/" /> : <Login />} 
        </Route>
        
        { admin ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/users">
                <UserList />
              </Route>

              <Route exact path="/user/:userId">
                <User />
              </Route>

              <Route exact path="/newUser">
                <NewUser />
              </Route>

              <Route exact path="/products">
                <ProductList />
              </Route>

              <Route exact path="/product/:productId">
                <Product />
              </Route>

              <Route exact path="/newProduct">
                <NewProduct />
              </Route>
            </div>
          </>
      
        ):(<Redirect to="/login" />)}
        
      </Switch>
    </Router>
  );
};

export default App;
