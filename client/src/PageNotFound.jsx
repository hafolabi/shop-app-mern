import {  useParams } from "react-router-dom"; 
 
 
 const PageNotFound = () =>{
  const params = useParams();
    return (
      <div
      
      style={{
        height:"100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          fontWeight: "700",
          fontSize: "20px",
          color: "teal",
          padding: "30px",
          border: "1px solid teal",
          backgroundColor: "white",
        }}
      >
         "{params.pageName}" page does not exist</button>
      </div>
    )
}

export default PageNotFound;