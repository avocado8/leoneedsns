import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Form, Input, Title, Wrapper, Error, Switcher } from "../components/auth-components";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const {target: {name, value}} = e;
    if (e.target.name==="name"){
      setName(e.target.value)
    }
    else if (e.target.name==="email"){
      setEmail(e.target.value)
    }
    else if (e.target.name==="password"){
      setPassword(e.target.value)
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name==="" || email==="" || password==="") return;
    try {
      // console.log(name, email, password);
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credentials.user, {
        displayName: name,
      })
      navigate("/");
    } catch(error) {
      if(error instanceof FirebaseError){
        setError("사용할 수 없는 비밀번호입니다.")
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Wrapper>
      <Title>Join Sekai</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="name" value={name} type="text" placeholder="Name" required />
        <Input onChange={onChange} name="email" value={email} type="text" placeholder="Email" required />
        <Input onChange={onChange} name="password" value={password} type="Password" placeholder="password" required />
        <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
      </Form>
      {error!="" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>

  )
}