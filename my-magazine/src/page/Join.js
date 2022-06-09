import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"; 
import { JoinFB } from "../redux/modules/user";
import "../css/Join.css";
 
const Join = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [pw, setPw] = React.useState("");
    const [repw, setRepw] = React.useState("");

    const signup = () => {
        dispatch(JoinFB(
            id, name, pw
        ))
        navigate('/Login');
    }

    return(
        <div className="Content">
            <h1>회원가입</h1>
            <input type="text" placeholder='id' className="id" onChange={(e) => setId(e.target.value)} /> <br/>
            <input type="text" placeholder='Username' className="Username" onChange={(e) => setName(e.target.value)} /> <br/>
            <input type="Password" placeholder='Password' className="Password" onChange={(e) =>setPw(e.target.value)} /> <br/>
            <input type="Password" placeholder='RePassword' className="RePassword" onChange={(e) => setRepw(e.target.value)} /> <br/>
            <button onClick={signup} disabled={id === "" || pw === "" || name === "" || repw === "" ? true : false}>
                JOIN
            </button>
        </div>
    )
}

export default Join;