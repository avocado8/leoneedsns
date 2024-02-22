import styled from "styled-components";

export const Wrapper = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImg = styled.img`
  margin-top: 25px;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  background-position: 50% 30%;
  background-size: 800%;
  background-image: url("../../../public/member_1.png");
  margin-bottom: 25px;
`;

export const Name = styled.span`
  margin-bottom: 5px;
  font-size: 16px;
  &.jpn {
    font-size: 10px;
    margin-bottom: 0;
  }
`;

export const Info = styled.div`
  font-size: 14px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  width: 220px;
  gap: 10px;
`;

export const InfoItem = styled.div`
  display: flex;
`;

export const InfoItemTitle = styled.span`
  text-align: left;
  display: flex;
  flex-grow: 1;
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background-color: white;
    margin: 0 10px;
  }
`;
export const InfoItemContent = styled.span`
  text-align: right;
`;

export const CommentInfo = styled.span`
  text-align: center;
`;

export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 25px 0;
  align-items: center;
`

export const Post = styled.div`
  width: 490px;
  background-color: rgba(255,255,255,.2);
  border: 1px solid white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 15px 10px;
  font-size: 14px;
  line-height: 1.3;
`;

export const PostContent = styled.span`
  flex-grow: 1;
`;

export const Likes =  styled.div`
  display: flex;
  flex-direction: column;
`;

export const Heart = styled.div`
  width: 15px;
  height: 15px;
  background-color: rgba(255,255,255,1);
  position: relative;
  transform: scale(.8) rotate(45deg);
  cursor: pointer;
  margin: 5px;
  &::before,
  &::after {
    content: "";
    width: 15px;
    height: 15px;
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255,255,255,1);
  }
  &::before {
    left: -50%;
    bottom: 0;
  }
  &::after {
    top: -50%;
    right: 0;
  }
  
  &.selected {
    background-color: #FB88B4;
  }
  &.selected::before,
  &.selected::after {
    background-color: #FB88B4;
  }
`;

export const HeartCount = styled.span`
  text-align: center;
  font-size: 10px;
`;

export const RefreshBtn = styled.button`
  width: 100px;
  background-color: white;
  border: 1px solid white;
  border-radius: 15px;
  font-size: 14px;
  &:hover {
    opacity: .8;
  }
  cursor: pointer;
`;