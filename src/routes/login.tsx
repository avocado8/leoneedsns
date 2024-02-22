import { Link, useNavigate } from "react-router-dom";
import { Error, Form, Input, Title, Wrapper, Switcher } from "../components/auth-components";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import ForgetPass from "../components/forget-pass";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "email"){
      setEmail(e.target.value);
    } else if(e.target.name === "password"){
      setPassword(e.target.value);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email==="" || password==="") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(error) {
      if (error instanceof FirebaseError){
        setError("로그인 오류. 다시 시도하세요");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <Title>Log In</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="email" type="text" placeholder="Email" required/>
        <Input onChange={onChange} name="password" type="password" placeholder="Password" required/>
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"}/>
      </Form>
      {error!="" ? <Error>{error}</Error> : null}
      <ForgetPass />
      <Switcher>
        Don't have an account? <Link to="/create-account">Create One &rarr;</Link>
      </Switcher>
    </Wrapper>

  )
}