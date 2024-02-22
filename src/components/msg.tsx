import styled from "styled-components";
import { auth, db, storage } from "../firebase"
import { IMsg } from "./msg-list";
import { deleteDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 490px;
  padding: 15px 10px;
  border: 1px solid white;
  border-radius: 15px;
  margin-bottom: 25px;
  background-color: rgba(255, 255, 255, .2);
`;

const UserImg = styled.img`
  border: 2px solid white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 10px;
  padding: 5px;
  object-fit: cover;
`;

const Column = styled.div`
  flex-grow: 1;
  width: 200px;
`;

const Username = styled.span`
  margin-right: 5px;
  margin-top: 1px;
  font-size: 16px;
`;

const PostTime = styled.span`
  margin-top: 1px;
  font-size: 12px;
`;

const Payload = styled.p`
  margin-top: 5px;
  font-size: 14px;
  line-height: 1.3;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #FB88B4;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    color: white;
    opacity: .8;
  }
`;

export default function Msg({message, createdAt, username, userId, id}:IMsg){
  const user = auth.currentUser;
  const anonymous = "/User.svg";
  const time = new Date(createdAt);
  
  const fullTime = (time.getFullYear()).toString() + "-" + (time.getMonth() + 1).toString() + "-"
  + (time.getDate()).toString() + " " + (time.getHours() + 1).toString()
  + ":" + (time.getMinutes()).toString();
  
  const [photoUrl, setPhotoUrl] = useState(anonymous);
  
  try {
    const photoRef = ref(storage, `avatars/${userId}`);
    getDownloadURL(photoRef)!.then(async(res)=>{
      if(res) setPhotoUrl(res);
    })
  } catch(e) {

  } finally {

  }
  

  const onDelete = async() => {
    const ok = confirm("이 포스트를 삭제할까요?");
    if(!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch(e){
      console.log(e);
    } finally {
    }
  }
  
  return <Wrapper>
    <UserImg src={photoUrl} />
    <Column>
      <Username>{username}</Username>
      <PostTime>{fullTime}</PostTime>
      {user?.uid === userId ? <DeleteBtn onClick={onDelete}>x</DeleteBtn> : null}
      <Payload>{message}</Payload>
    </Column>
  </Wrapper>
}