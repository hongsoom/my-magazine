import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { auth } from "../shared/firebase";
import styled from 'styled-components';
import profile from "../assets/Profile.jpg";
import { FaEdit } from "react-icons/fa";

const Post = () => {
  const data = useSelector((state) => state.magazine.magazine);
  const name = useSelector((state) => state.user.name);

  const navigate = useNavigate();

  return (
    <Box>
      {data.map((list, index) => {
        return (
          <PostBox>
            <ProfileBox>
              <ProandName>
                <img src={profile} alt="profile"></img>
                <p>{list.name}</p>
              </ProandName>
              <LoginButton>
                {name === list.name ? (
                  <button
                    onClick={() =>
                      navigate("/Edit/" + index + "/" + `${list.id}`)
                    }
                  >
                    <FaEdit size="25" color="black" />
                  </button>
                ) : null}
              </LoginButton>
            </ProfileBox>
            <Content
              onClick={() => navigate("/Detail/" + index + "/" + `${list.id}`)}
            >
              <p>{list.text}</p> <br />
              <img src={list.image_url} alt="post_image" />
              <p>{list.date}</p>
            </Content>
          </PostBox>
        );
      })}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 80px;
`;

const PostBox = styled.div`
  margin-bottom: 50px;
  width: 500px;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProandName = styled.div`
  display: flex;
  flex-direction: row;
  img {
    width: 50px;
    border-radius: 50%;
  }
  p {
    font-weight: 900;
  }
`;
const LoginButton = styled.div`
  display: flex;
`;

const Content = styled.div`
  align-items: center;
  cursor: pointer;
  img {
    width: 500px;
    height: 500px;
  }
  p {
    font-weight: 900;
    height: 20px;
  }
`;

export default Post;
