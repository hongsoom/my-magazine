import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Post from "../component/post";
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa";

const Main = () => {

    const navigate = useNavigate();

    const is_login = useSelector((state) => state.user.is_login);
    
    return (
        <Content>
            <Post/>
            {is_login ? <Button onClick={() => navigate('/Add')}><FaPlus size='25'/></Button> : null }
        </Content>
    )
}

const Content = styled.div`
    display : flex;
    flex-direction : column;
    align-items: center;
    margin-top: 100px;
    position:relative; 
    margin-bottom:45px; 
`;

const Button = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;   
    cursor : pointer;
    background-color: #C0C0C0;
    dlsplay : block;
    width : 50px;
    height : 50px;
    border-radius: 50%;
    margin : 50px;
    align-items: center;

`;  

export default Main;