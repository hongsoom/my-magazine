import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { LogoutFB } from "../redux/modules/user";
import styled from 'styled-components';
import profile from "../assets/Profile.jpg";
import { TiHome, TiExport, TiUserAdd, TiUser } from "react-icons/ti";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);

    const is_login = useSelector((state) => state.user.is_login);
    
    return (
       <Wrapper>
          <Logo onClick={() =>navigate('/')}><TiHome size='30'/></Logo>
          {is_login ? (
            <Content>
             <img src={profile} alt="profile"></img>
             <p>{user[0].name}</p>
             <button onClick={ () => dispatch(LogoutFB())}><TiExport size='30' /></button>
           </Content>
          ) : (
            <Content>
              <button onClick={() => navigate('/Join')}><TiUserAdd size='30'/></button>
              <button onClick={() => navigate('/Login')}><TiUser size='30'/></button>
            </Content>
          )}
       </Wrapper >
    )  
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  height: 80px;
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: black;
  border-bottom: 1px solid black;
`;

const Logo = styled.div`
  cursor : pointer;
  width: 30px;
  height : 30px;
`;

const Content = styled.div`
  display : flex;
  flex-direction: row;
  flex-wrap : nowrap;
  img {
    dlsplay : block;
    width : 50px;
    height : auto;
    border-radius: 50%;
    margin-right : 10px;
  }
  p {
    font-weight:900;
    margin : 10px;
  }
  button {
    margin : 10px;
  }
`;

export default Header;