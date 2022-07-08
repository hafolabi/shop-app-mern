import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleClick = () => {
   // e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <span
        style={{
          color: "gray",
          fontWeight: "400",
          fontSize: "30px",
          marginBottom: "27px",
        }}
      >
        Dashboard Login
      </span>
        {error && <span style={{fontSize:13, color:"red", marginBottom:15}}> Invalid Credentials </span>}
      <input
        style={{
          marginBottom: "20px",
          padding: "13px",
          width: "200px",
        }}
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{
          marginBottom: "20px",
          padding: "13px",
          width: "200px",
        }}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleClick}
        style={{
          padding: "10px",
          backgroundColor: "darkblue",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          color: "white",
          borderRadius: "5px",
          marginTop: "10px",
          width: "100px",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
