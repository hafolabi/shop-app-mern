import React, { useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("Images/categories1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ height:'100%' })}
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  border: 1px solid teal;
  opacity: 0.9;
  ${mobile({ width: "75%", marginTop:'100px',  marginBottom:'100px'})}
  ${tablet({ width: "60%" })}

`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  font-size:16px;
  ${tablet({ minWidth: "30%" })}

  &:focus {
     outline:none; 
  }
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [existUsername, setExistUsername] = useState("");
  const [existEmail, setExistEmail] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [error, setError] = useState(false)

  const handleSubmit = async(e)=>{
      e.preventDefault()
      setError(false);
      setMismatch(false);
      setExistUsername('')
      setExistEmail('')

      if(password !== confirmPass){
          setMismatch(true)
      }else{
          const userCredentials = {
            firstname,
            lastname,
            username,
            email,
            password,
          }
      try{
       await publicRequest.post('/auth/register/', userCredentials)
        window.location.replace('/login')
        setError(false);
      }catch(err){
        setError(true);
        setExistUsername(err.response.data.msg)
        setExistEmail(err.response.data.keyPattern?.email === 1 && 'email already exist!')
      }
    } 
  }

  const errorStyle ={
      color:'red',
      fontSize:"14px",
      marginTop:'10px',
  }

  const errorStyle2 ={
    color:'red',
    fontSize:"11px",
    marginTop:'10px',
}

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <p style={errorStyle}>{existUsername}</p>
        <p style={errorStyle}>{existEmail}</p>
        {error && (<p style={errorStyle2}>something went wrong...</p>)}
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="First Name"
            type="text"
            required
            autoFocus={true}
            onChange={(e)=>setFirstname(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            type="text"
            required
            onChange={(e)=>setLastname(e.target.value)}
          />
          <Input
            placeholder="Username"
            type="text"
            required
            onChange={(e)=>setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            minLength="5"
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            minLength="5"
            required
            onChange={(e)=>setConfirmPass(e.target.value)}
          />
          {mismatch && (<p style={errorStyle}>Password Mismatch! kindly check and retry </p>)}
          <Agreement>
            By creating an account, I consent with the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b> else{" "}
            <Link to="/">
              <b>Back to Home</b>
            </Link>
          </Agreement>
          <Button type='submit'>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
