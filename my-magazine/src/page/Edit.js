import React, { useRef, useState }from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"; 
import { storage } from "../shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { modifyMagazineFB } from "../redux/modules/magazine";

const Edit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector((state) => state.magazine.magazine);

    const index  = useParams().index;
    const magazine_id =  useParams().id;

    const [preview, setPreview ] = useState(data[index].image_url);
    const [imageName, setimageName ] = useState("");
    const [text, setText] = useState(data[index].text);

    const file_link_ref = useRef(null);

    const uploadFB = async (e) => {

        const uploded_file = await uploadBytes(ref(storage, `images/${e.target.files[0].name}`),
        e.target.files[0]
        );

        const reader = new FileReader();
        const file =  e.target.files[0];
        
        setimageName(file.name);

        reader.readAsDataURL(file);
        reader.onload = function(e) { 
            setPreview(e.target.result);
        }

        const file_url = await getDownloadURL(uploded_file.ref);

        file_link_ref.current = { url : file_url };
    }

    const modifyMagazine = () => {
       dispatch(modifyMagazineFB({
        text,
        image_url : file_link_ref.current.url,
       }, magazine_id))
       navigate('/');
    }

    return(
        <Content>
            <Title>게시글 수정</Title>

            <FileUpload>
                <h4>Image</h4>
                <input type="text" disabled value={imageName ? imageName : '이미지를 고르세요!'}/>
                <input type="file" id="file" onChange={uploadFB}/> <br/>
            </FileUpload>
            <PreviewContainer>
                <img src={preview} alt="preview" />
            </PreviewContainer>
            <textarea placeholder='게시글 수정' value={text} onChange={(e) => { setText(e.target.value);}} /> <br/>
            <button type="button" onClick={modifyMagazine} disabled={text === "" || file_link_ref === "" ? true : false}>게시글 수정</button> <br/>
        </Content>
    )
}

const Content = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    margin-top : 100px;
`;

const Title = styled.div`
    font-size : 20px;
    font-weight : 900;
    font-family: "Nunito Sans", sans-serif;
`;

const Layout = styled.div`
    text-align: left;
    margin-bottom : 20px;
    & select {
        width: 100%;
        height: 40px;
        padding: 0 8px;
        border: 1px solid #cacaca;
    }
`;

const FileUpload = styled.div`
    text-align: left;
    margin: 0 0 16px 0;
    & input {
        display: flex;
        align-items: center;
        height: 40px;
        border: 1px solid #cacaca;
        color: #cacaca;
        cursor: pointer;
        box-sizing: border-box;
        padding: 0 8px;
    }
`;

const PreviewContainer = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    & img {
        max-width: 50%;
    }
`;
export default Edit;
