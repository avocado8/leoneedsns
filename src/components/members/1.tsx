import { MembersData, MembersName, MembersNameJpn } from "./memdata.js"
import { Post, Wrapper, ProfileImg, Name, Info, InfoItem, InfoItemTitle, InfoItemContent, Posts, CommentInfo, PostContent, Likes, Heart, RefreshBtn } from "./memberpage.ts"
import { clearArr, getRandom } from "../../scripts/main-story.ts"
import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase.ts"
import { useEffect, useState } from "react"

const style = {
  backgroundImage: `url("../../../public/member_1.png")`,
  border: `2px solid #33AAEE`
}

export interface IComment {
  comment: string;
  cid: string;
}

export default function Member1() {
  const member = Object.entries(MembersData[0])
  const name = MembersName[0]
  const jpnName = MembersNameJpn[0]

  const [refresh, setRefresh] = useState(0);
  const onRefresh = () => {
    setRefresh(refresh + 1);
  }

  const [comments, setComments] = useState<IComment[]>([]);

  const fetchComments = async() => {
    const commentsQuery = query(
      collection(db, "comments-1")
    );
    const snapshot = await getDocs(commentsQuery);
    setComments(clearArr(comments));
    snapshot.docs.forEach(doc => {
      if(doc.id[1] === "1"){
        const {comment, cid} = doc.data();
        comments.push({comment, cid});
      }
      
    })
  }

  const pickedScriptsIndex = getRandom(comments); //index만
  // console.log(pickedScriptsIndex)

  useEffect(() => {
    fetchComments();
    // console.log(comments)
  },[refresh])

  const user = auth.currentUser;

  const onClick = async (e: any) => {
    if (e.target instanceof HTMLDivElement) {
      const heartEl = e.target;
      heartEl.classList.toggle("selected");
      if(heartEl.classList.contains("selected")){
        const selectedCommentId = e.target.parentElement?.parentElement?.id;
        try {
          await setDoc((doc(db, "liked-comments", `${user?.uid}`)), {
            cid: selectedCommentId,
            userId: user?.uid,
          })
        } catch(e) {
          console.log(e)
        } finally {

        }
      } else {
        await deleteDoc((doc(db, "liked-comments", `${user?.uid}`)))
      }
      
    }
  }

  return (
    <Wrapper>
      <ProfileImg style={style} />
      <Name>{name}</Name>
      <Name className="jpn">{jpnName}</Name>

      <Info>
        {
          member.map(([key, value]) => {
            return (
              <InfoItem key={key}>
                <InfoItemTitle>{key}</InfoItemTitle>
                <InfoItemContent>{value}</InfoItemContent>
              </InfoItem>
            )
          })
        }
      </Info>
      
      
      <Posts>
        <CommentInfo>Comments</CommentInfo>
        <RefreshBtn onClick={onRefresh}>{refresh===0 ? "Show" : "Refresh"}</RefreshBtn>
        {
          pickedScriptsIndex.map((index) => {
            return(<Post key={index} id={comments[index].cid}>
              <PostContent>{comments[index].comment}</PostContent>
              <Likes>
                <Heart className="heart" onClick={onClick}></Heart>
              </Likes>
            </Post>)
          })
        }
      </Posts>
      

    </Wrapper>
  )
}