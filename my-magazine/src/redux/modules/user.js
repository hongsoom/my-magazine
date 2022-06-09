import { auth, db } from '../../shared/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, where, query } from "firebase/firestore";

const LOG_IN = 'user/LOG_IN';
const JOIN = 'user/JOIN';
const LOG_OUT = 'user/LOG_OUT';

const initialState = {
    user : "",
    is_login: false,
};

export const Login = (user_name) => {
    return { type: LOG_IN, user_name };
};

export const Join = (user) => {
    return { type: JOIN, user };
};

export const Logout = (user) => {
    return { type: LOG_OUT, user };
};

// middlewares
export const LoginFB = (id, pw) => {
    return async function (dispatch, {history}) {
        const user = await signInWithEmailAndPassword(
            auth,
            id,
            pw
        )
        .catch((error) => {
            if (error.code === "auth/invalid-email") {
              alert("아이디를 이메일 형식으로 입력해주세요");
            } else if (error.code === "auth/user-not-found") {
              alert("존재하는 아이디가 없습니다.");
            } else if (error.code === "auth/wrong-password") {
              alert("비밀번호가 일치하지 않습니다.");
            }
        });
        const user_name = [];

        const user_docs = await getDocs(query(collection(db, "users"), 
        where("id", "==", auth.currentUser.email)));
    
        user_docs.forEach((u) => {
            user_name.push(u.data());
        }); 
        console.log(user_name)
        dispatch(Login(user_name))
    }
  }
  
  export const JoinFB = (id, name ,pw) => {
    return async function (dispatch) {
        const user = await createUserWithEmailAndPassword(
            auth, 
            id,
            pw,
        )
        .catch((error) => {
            if (error.code === "auth/invalid-email") {
            alert("아이디를 이메일 형식으로 입력해주세요");
            } else if (error.code === "auth/user-not-found") {
            alert("존재하는 아이디가 없습니다.");
            } else if (error.code === "auth/wrong-password") {
            alert("비밀번호가 일치하지 않습니다.");
            }
        }); 
        const user_data = await addDoc(collection(db, "users"), {
            id : id, 
            name : name, 
            pw : pw,
        });
        dispatch(Login(user_data))
    }
  }

export const LogoutFB = () => {
    return async function(dispatch) {

      console.log(auth.currentUser);

        auth.signOut().then(() => {
        dispatch(Logout());
        })
    }
  }
  
  export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case "user/LOG_IN":
        return {is_login: true, user : action.user_name};
  
      case "user/JOIN": 
        break;

      case "user/LOG_OUT":
        return {is_login: false, user : action.user_name};

      default:
        return state;
    }
  }  
