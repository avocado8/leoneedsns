import styled from "styled-components";
import PostMsgForm from "../components/post-msg-form";
import MsgList from "../components/msg-list";

const Wrapper = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ToLeoneed() {
  return (
    <Wrapper>
      <PostMsgForm />
      <MsgList />
    </Wrapper>
  )
}