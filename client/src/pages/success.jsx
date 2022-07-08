import React from "react";
import { useLocation, Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  return (
    <>
      <div
        style={{
          marginTop: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            border: "none",
            width: "200px",
            borderRadius: "5px",
            padding: "20px",
            fontSize: "17px",
            backgroundColor: "teal",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Successfull
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "14px" }}>
          
          Thank you for buying from us. We expect more of you. &nbsp;
          <Link to="/">Return to home</Link>
        </span>
      </div>
    </>
  );
};

export default Success;
