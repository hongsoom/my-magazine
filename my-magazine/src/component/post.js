import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import profile from "../assets/Profile.jpg";
import { FaEdit } from "react-icons/fa";

const Post = () => {

    const data = useSelector((state) => state.magazine.magazine);
    const is_login = useSelector((state) => state.user.is_login);

    const navigate = useNavigate();

    return (
        <Box>
           {data.map ((list, index) => { 
                return ( 
                <PostBox>
                    <ProfileBox>
                        <img src={profile} alt="profile"></img>
                        <p>{list.name}</p>
                        {is_login ? <button onClick={() => navigate('/Edit/' + index + '/' + `${list.id}`)}><FaEdit size='25'/></button> : null }
                    </ProfileBox>
                    <Content onClick={() => navigate('/Detail/' + index + '/' + `${list.id}`)}>
                        <p>{list.text}</p> <br/>
                        <img src={list.image_url} alt="post_image"/> 
                    </Content>
                </PostBox>
           )})}
        </Box>    
    )
}

const Box = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    text-align : center;
    margin-top : 80px;
`;

const PostBox = styled.div`
    margin-bottom: 20px;
    width : 500px;
    hegiht : 500px;
    border : 1px solid black;
`;

const ProfileBox = styled.div`
    display : flex;
    flex-direction: row;
    flex-wrap : nowrap;
    img {
        position: absolute;
        width : 50px;
        height : auto;
        border-radius: 50%;
    }
    p {
        position: absolute;
        font-weight:900;
    }
    button {
        position: absolute;
        right : 0;
    }
`;

const Date = styled.div`

`;

const Content = styled.div`
    align-items : center;
    cursor: pointer;
    img{
        width :500px;
        height: 500px;
    }
    p {
        font-weight:900;
        height : 100px;
    }
`;


export default Post;