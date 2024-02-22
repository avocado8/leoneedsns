import { Link } from "react-router-dom";
import styled from "styled-components"

const Wrapper = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
`;

const MemberList = styled.div`
  margin-top: 25px;
  display: flex;
  gap: 30px;
  justify-content: center;
`;

const Mem = styled.div`
  overflow: hidden;
  &:hover{
    transform: scale(1.1);
  }
  transition: .4s;
`;

const MemImg = styled.div`
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  background-position: 50% 30%;
  background-size: 800%;
  border: 2px solid;
  border-radius: 50%;
  &.first {
    background-image: url("/member_1.png");
    border-color: #33AAEE;
  }
  &.second {
    background-image: url("/member_2.png");
    border-color: #FFDE45;
  }
  &.third {
    background-image: url("/member_3.png");
    border-color: #EE6666;
  }
  &.fourth {
    background-image: url("/member_4.png");
    border-color: #BBDE22;
  }
`;

export default function Member() {
  return(
    <Wrapper>
      <MemberList>
        <Mem>
          <Link to="/member/1">
            <MemImg className="first"></MemImg>
          </Link>
        </Mem>
        <Mem>
          <Link to="/member/2">
            <MemImg className="second"></MemImg>
          </Link>
        </Mem>
        <Mem>
          <Link to="/member/3">
            <MemImg className="third"></MemImg>
          </Link>
        </Mem>
        <Mem>
          <Link to="/member/4">
            <MemImg className="fourth"></MemImg>
          </Link>
        </Mem>
      </MemberList>
    </Wrapper>
  )
}