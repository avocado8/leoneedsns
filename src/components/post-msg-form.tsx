import { useState } from "react";
import styled from "styled-components"
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const Form = styled.form`
  margin-top: 25px;
  display: flex;
  gap: 10px;
  color: #212427;
  margin-bottom: 25px;
`;

const TextArea = styled.textarea`
  width: 400px;
  font-size: 16px;
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  padding: 10px 10px;
  border-radius: 15px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.input`
  width: 80px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    opacity: .9;
  }
`;

export default function PostMsgForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user || isLoading || message==="") return;
    try {
      setIsLoading(true);
      await addDoc((collection(db, "messages")), {
        message,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      setMessage("");
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <Form onSubmit={onSubmit}>
      <TextArea onChange={onChange} value={message} rows={2} maxLength={200} placeholder="응원의 메시지를 남겨주세요." required/>
      <SubmitBtn type="submit" value="게시하기" />
    </Form>
  )
}