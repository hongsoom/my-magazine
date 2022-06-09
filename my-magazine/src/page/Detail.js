import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { deleteMagazineFB } from "../redux/modules/magazine";
import styled from 'styled-components';
import { FaTrashAlt } from "react-icons/fa";

const Detail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector((state) => state.magazine.magazine);
    const is_login = useSelector((state) => state.user.is_login);
    //const user = useSelector((state) => state.user.user);

    const index  = useParams().index;
    const magazine_id =  useParams().id;

    const delete_post = () => {
        dispatch(deleteMagazineFB(
            magazine_id
        ))
        navigate('/');
    }
  
    return(
        <>
        <Content>       
            <img src={data[index].image_url} alt="post_image"/>
            {data[index].text}
        </Content>
        <Delete>           
         {is_login ? <button onClick={delete_post}><FaTrashAlt size='20'/></button> : null }
        </Delete>            
        </> 
    )
}

const Content = styled.div`
    display : flex;
    flex-direction : column;
    align-items: center;
    margin-top: 100px;
    position:relative; 
    margin-bottom:45px; 
    img{
        width :500px;
        height: 500px;
    }
`;

const Delete = styled.div`
    display : flex;
    align-items: center;
`;

export default Detail;