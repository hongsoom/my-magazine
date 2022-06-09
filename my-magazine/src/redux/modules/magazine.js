import { db } from "../../shared/firebase";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Actions
const LOAD = 'magazines/LOAD';
const ADD = 'magazines/ADD';
const MODIFY = 'magazines/MODIFY';
const DELETE = 'magazines/DELETE';

// 초기 상태값
const initialState = {
  magazine : [
   ],
  };

// Action Creators
export function loadMagazine(magazine_list) {
  return { type: LOAD, magazine_list };
}
// 
export function addMagazine(magazine) {
  return { type: ADD, magazine };
}

export function modifyMagazine(magazine, magazine_index) {
  return { type: MODIFY, magazine, magazine_index };
}


export function deleteMagazine(magazine_index) {
  return { type: DELETE, magazine_index };
}

// middlewares
export const loadMagazineFB = () => {
  return async function (dispatch) {
    const magazine_data = await getDocs(collection(db, "magazines"));

    let magazine_list = [];

    magazine_data.forEach((doc) => {
        magazine_list.push({id:doc.id, ...doc.data()});
    });

    magazine_list.sort((a,b) => {
      return b.date - a.date;
    })

    dispatch(loadMagazine(magazine_list));
  }
}

export const addMagazineFB = (magazine) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "magazines"), magazine);
    const magazine_data = {id: docRef.id, ...magazine};

    dispatch(addMagazine(magazine_data));
  }
}

export const modifyMagazineFB = (magazine, magazine_id) => {
  return async function(dispatch,getState) {
    const docRef = doc(db, "magazines", magazine_id);
    await updateDoc(docRef, {
        text : magazine.text,
        image_url : magazine.image_url,
    });

    const _magazine_list = getState().magazine.magazine;
    const magazine_index = _magazine_list.findIndex((l) => {
      return l.id === magazine_id;
    })
    
    dispatch(modifyMagazine(magazine, magazine_index));
  }
}

export const deleteMagazineFB = (magazine_id) => {
  return async function(dispatch, getState) {
    const docRef = doc(db, "magazines", magazine_id);
    await deleteDoc(docRef);
    
    const _magazine_list = getState().magazine.magazine;
    const magazine_index = _magazine_list.findIndex((i) => {
      return i.id === magazine_id;
    });

    dispatch(deleteMagazine(magazine_index));
  }
}

// reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case "magazines/LOAD":
        return {magazine : action.magazine_list};
  
      case "magazines/ADD": {
        const new_magazine_list = [...state.magazine, action.magazine];
        new_magazine_list.sort((a,b) => {
          return b.date - a.date;
        })
        return { magazine: new_magazine_list };
      }

      case "magazines/MODIFY": {
        const new_magazine_list = state.magazine.map((a, idx) => 
          parseInt(action.magazine_index) === idx ? { ...a, ...action.magazine } : a);
        return { ...state, magazine: new_magazine_list };
      }

      case "magazines/DELETE": {
      const new_magazine_list = state.magazine.filter((l, idx) => {
        return parseInt(action.magazine_index) !== idx;
      });
      return {magazine: new_magazine_list};
    }
      default:
        return state;
    }
  }