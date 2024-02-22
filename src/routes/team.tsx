import YouTube from "react-youtube";
import styled from "styled-components";
import memimg1 from "../images/team/team_1.png";
import memimg2 from "../images/team/team_2.png";
import memimg3 from "../images/team/team_3.png";
import memimg4 from "../images/team/team_4.png";

const Wrapper = styled.div`
  width: 780px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const ImageContainer = styled.div`
  margin-top: 25px;
  height: 380px;
  display: flex;
  position: relative;
  background-color: rgba(255,255,255,.2);
`;

const MemImg = styled.img`
  height: 380px;
  position: absolute;
  transform: translateX(20px);
  &:nth-child(2) {
    transform: translateX(65%);
  }
  &:nth-child(3) {
    transform: translateX(110%);
  }
  &:nth-child(4) {
    transform: translateX(170%);
  }
`;

const ContentContainer = styled.div`
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Intro = styled.div`
`;

const Title = styled.span`
  width: 100%;
  font-size: 22px;
  font-weight: 500;
`;
const Describe = styled.p`
  padding: 10px 0;
  line-height: 1.3;
`;

const MainStory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px 0;
`;

const EventStory=styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 25px 0;
`;

const EventLogo = styled.img`
  width: 120px;
  &:hover {
    transform: scale(1.1);
  }
`;

const EventSong=styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 25px 0;
`;

const SongElement = styled.div`
  cursor: pointer;
`;

const SongImg = styled.img`
  width: 100px;
  &:hover {
    transform: scale(1.1);
  }
`;

const logoimgList = [1,2,3,4,5,6,7,8,9,10,11,12];

const songList = Object.entries({
  1: "https://youtu.be/AL6hWKN0WQo",
  2: "https://youtu.be/70ZLvDTonqI",
  3: "https://youtu.be/_GdIO1AANg4",
  4: "https://youtu.be/tpc9wH_JPfk",
  5: "https://youtu.be/hZgbqUQI64E",
  6: "https://youtu.be/Sloi-L5FHBY",
  7: "https://youtu.be/IPIwkhKdQxM",
  8: "https://youtu.be/eEs1PD_33EM",
  9: "https://youtu.be/diDsFjpV8yw",
  10: "https://youtu.be/6AfASbJBrJY",
  11: "https://youtu.be/chjFdvgWAjo",
  12: "https://youtu.be/2GK1B1RshN4",
})

const youtubeStyle = {
  padding: "20px 0"
}

export default function Team() {
  return <Wrapper>
    <ImageContainer>
      <MemImg src={memimg1} />
      <MemImg src={memimg2} />
      <MemImg src={memimg3} />
      <MemImg src={memimg4} />
    </ImageContainer>
    <ContentContainer>
      <Intro>
        <Title>Intro</Title>
        <Describe>이런저런 사정 때문에 소꿉친구와 멀어진 호시노 이치카. 하지만 소꿉친구 중 한 명인 텐마 사키가 요양을 끝내고 학교로 돌아오면서 멀어졌던 네 사람의 관계에 변화가 생기기 시작하는데…</Describe>
      </Intro>
      <MainStory>
        <Title>Main Story</Title>
        <YouTube videoId={"_2uF6IK8HeQ"}
        opts={{
          width: "672", height: "378",
          playerVars: {
            autoPlay: 1
          }
        }}
        onEnd={(e)=>{e.target.stopVideo(0);}}
        style={youtubeStyle}
        />
      </MainStory>
      <EventStory>
        <Title>Key Story</Title>
        {
          logoimgList.map((logo, index) => {
            return <EventLogo src={`/logo/logo_${logo}.webp`} key={index} />
          })
        }
      </EventStory>

      <EventSong>
        <Title>Event Song</Title>
        {
          songList.map(([key,value], index) => {
            return(
              <SongElement key={index}
              onClick={() => window.open(value)}>
                <SongImg src={`/song/song_${key}.webp`} />
              </SongElement>
            )
          })
        }
      </EventSong>
    </ContentContainer>
  </Wrapper>
}