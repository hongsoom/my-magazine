import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../shared/firebase";
import Post from "../component/post";
import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";

const Main = () => {
  const navigate = useNavigate();

  const is_login = useSelector((state) => state.user.is_login);

  return (
    <>
      <Post />
      {is_login ? (
        <Button onClick={() => navigate("/Add")}>
          <FaPlusCircle size="40" color="rgb(222, 159, 228)" />
        </Button>
      ) : null}
    </>
  );
};

const Button = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin: 50px;
`;

export default Main;
