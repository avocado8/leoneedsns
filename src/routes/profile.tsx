import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase"
import styled from "styled-components";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const AvatarUpload = styled.label``;

const AvatarImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
`;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 16px;
  margin: 10px 0 5px;
  font-weight: 700;
`;
const Email = styled.span`
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 5px;
`

const Btns = styled.div``

const RemoveImgBtn = styled.button`
  border-radius: 15px;
  cursor: pointer;
  border: none;
  padding: 5px;
  background-color: transparent;
  &:hover {
    opacity: .3;
    background-color: #4455DD;
  }
`;


const LogoutBtn = styled.button`
  border-radius: 15px;
  cursor: pointer;
  border: none;
  padding: 5px;
  background-color: transparent;
  &:hover {
    opacity: .3;
    background-color: #4455DD;
  }
`;

const LogoutImg = styled.img`
  width: 25px;
`;

const CommentsYouLiked = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  &.empty{
    display: none;
  }
`;

const Title = styled.span`

`;

const Content = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, .2);
  width: 490px;
  border: 1px solid white;
  border-radius: 15px;
  padding: 10px 10px;
  font-size: 14px;
  line-height: 1.3;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
  object-fit: cover;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: 50% 30%;
  background-size: 800%;
  border: 2px solid white;
  border-radius: 50%;
`;

const Comment = styled.p`
  width: 380px;
  font-size: 14px;
`;

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const username = user?.displayName;
  // const [username, setUsername] = useState(user?.displayName);
  const email = user?.email;
  // const [email, setEmail] = useState(user?.email);

  const onAvatarChange = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!user) return;
    const locationRef = ref(storage, `avatars/${user?.uid}`);
    const result = await uploadBytes(locationRef, file);
    const avatarUrl = await getDownloadURL(result.ref);
    setAvatar(avatarUrl);
    await updateProfile(user, {
      photoURL: avatarUrl
    })
  }

  const onRemoveImg = async() => {
    if (!user || document.querySelector(".avatar-img")?.getAttribute("src")==="../../public/User.svg"){
      return;
    }
    else {
      const photoRef = ref(storage, `avatars/${user.uid}`);
      await deleteObject(photoRef).then(() => {
        updateProfile(user, {
          photoURL: "../../public/User.svg"
        })
        setAvatar("");
      })
    }
  }

  const onLogOut = async() => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if(ok) {
      await auth.signOut();
      navigate("/login");
    }
  }

  const [likedCommentCid, setLikedCommentCid] = useState("");
  const [likedComment, setLikedComment] = useState("none");

  const fetchComments = async() => {
    const likedCommentQuery = query(
      collection(db, "liked-comments")
    );
    const snapshot = await getDocs(likedCommentQuery);
    snapshot.docs.forEach(doc => {
      if(user?.uid === doc.id){
        const {cid} = doc.data();
        setLikedCommentCid(cid);
      }
      
    })

    const commentQuery = query(
      collection(db, "comments-1")
    );
    const snapshot2 = await getDocs(commentQuery);
    snapshot2.docs.forEach(doc => {
      const {comment, cid} = doc.data();
      if (cid===likedCommentCid) {
        setLikedComment(comment)
      }
    })
  }


  useEffect(() => {
    fetchComments();
  })

  const imgStyle = {
    backgroundImage: `url("/member_${likedCommentCid[0]}.png")`
  }

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        <AvatarImg className="avatar-img" src={avatar ? avatar : "/User.svg"} />
      </AvatarUpload>
      <AvatarInput onChange={onAvatarChange} type="file" id="avatar" />
      <Name>{username}</Name>
      <Email>{email}</Email>
      <Btns>
        <RemoveImgBtn onClick={onRemoveImg}>
        <svg width={"25px"} fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>
        </RemoveImgBtn>
        <LogoutBtn onClick={onLogOut}>
          <LogoutImg src="/LogOut.svg" />
        </LogoutBtn>
      </Btns>


      <CommentsYouLiked className="comments-you-liked">
        <Title>Recently Liked Comment</Title>
        <Content>
          <ProfileImg style={imgStyle} />
          <Comment>{likedComment}</Comment>
        </Content>
      </CommentsYouLiked>
    </Wrapper>
  )
}