import styled from "styled-components"
import Msg from "./msg";
import { useEffect, useState } from "react";
import { Unsubscribe, collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export interface IMsg {
  id: string;
  message: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  width: 490px;
`;

export default function MsgList(){
  const [messages, setMessages] = useState<IMsg[]>([]);

  useEffect(() => {
    let unsubscribe : Unsubscribe | null = null;
    const fetchMsgs = async() => {
      const msgsQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      unsubscribe = await onSnapshot(msgsQuery, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const {message, createdAt, userId, username} = doc.data();
          return {
            message, createdAt, userId, username,
            id: doc.id,
          }
        })
        
        setMessages(messages);
      })
    }
    fetchMsgs();
    return () => {
      unsubscribe && unsubscribe();
    }
  }, [])

  return (
    <Wrapper>
      {messages.map(msg => <Msg key={msg.id} {...msg}/>)}
    </Wrapper>
  )
}