import React from 'react';
import { useDispatch } from "react-redux"; 
import { useNavigate } from 'react-router-dom';
import { LoginFB } from '../redux/modules/user';
import "../css/Login.css";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pw, setPw] = React.useState("");

    const Login = () => {
        dispatch(LoginFB(
            id, pw
        ))
        navigate('/');  
    }

    return(
        <div className="Content">
            <h1 className="title">
                로그인
            </h1>
            <input type="text" placeholder='Username' id='Username' onChange={(e) => setId(e.target.value)} />
            <input type="Password" placeholder='Password' id='Password' onChange={(e) =>setPw(e.target.value)} />
            <button onClick={Login} disabled={id === "" || pw === "" ? true : false}>
                LOGIN
            </button>
        </div>
    );
}

export default Login;