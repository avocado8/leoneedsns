import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import mainlogo from '../../public/logo_light_sound.png';

const Wrapper = styled.div`
  width: 800px;
  margin-top: 20px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 200px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    text-decoration: underline;
    
  }
`;

const MenuItem = styled.div`
  
`;

const Separate = styled.div`
  height: 1px;
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
`;

export default function Layout() {
  return(
    <Wrapper>
      <Logo>
        <Link to="/">
          <LogoImg src={mainlogo} />
        </Link>
      </Logo>
      <Menu>
        <Link to="/team">
          <MenuItem>Team</MenuItem>
        </Link>
        <Link to="/member">
          <MenuItem>Member</MenuItem>
        </Link>
        <Link to="/toleoneed">
          <MenuItem>To. Leo/need</MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem>User</MenuItem>
        </Link>
      </Menu>
      <Separate></Separate>
      <Outlet/>
    </Wrapper>
  )
}