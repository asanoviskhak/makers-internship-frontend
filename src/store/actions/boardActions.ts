import { ThunkAction } from "redux-thunk";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Author, Board, BoardAction, registerData, User } from "../types";
import { RootState } from "../index";
import {
  setError,
  startLoading,
  submitLoading,
  endLoading,
} from "./pageActions";

export const registerBoard = (
  data: registerData,
  user: User,
  onError: () => void
): ThunkAction<void, RootState, null, BoardAction> => {
  return async (dispatch) => {
    try {
      const boardData = {
        title: data.title,
        content: data.content,
        author: user.id,
        createdAt: serverTimestamp(),
      };
      dispatch(startLoading);
      await addDoc(collection(db, "board"), boardData);
      dispatch(submitLoading());
    } catch (err: any) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  };
};

export const fetchBoardAll = (): ThunkAction<
  void,
  RootState,
  null,
  BoardAction
> => {
  return async (dispatch) => {
    try {
      dispatch(startLoading);
      let boardList = await getDocs(collection(db, "board"));
      let res: Board[] = [];
      if (!boardList.empty) {
        boardList.forEach((doc) => {
          res.push({
            id: doc.id,
            ...doc.data(),
          } as Board);
        });
      }
      dispatch({ type: "FETCH_ALL_BOARD", payload: res });
      dispatch(endLoading);
    } catch (err: any) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

export const deleteBoardById = (
  id: string
): ThunkAction<void, RootState, null, BoardAction> => {
  return async (dispatch) => {
    try {
      dispatch(startLoading);
      await deleteDoc(doc(db, "board", id));
      dispatch({ type: "DELETE_BOARD", payload: id });
      dispatch(endLoading);
    } catch (err: any) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

export const fetchBoardById = (
  id: string
): ThunkAction<void, RootState, null, BoardAction> => {
  return async (dispatch) => {
    try {
      dispatch(startLoading);
      let board = await getDoc(doc(db, "board", id));
      if (board.exists()) {
        dispatch({ type: "FETCH_BOARD", payload: board.data() as Board });
        dispatch({ type: "EDIT_BOARD", payload: board.data() as Board });
      }
      dispatch(endLoading);
    } catch (err: any) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

export const editBoard = (
  id: string,
  data: registerData,
  onError: () => void
): ThunkAction<void, RootState, null, BoardAction> => {
  return async (dispatch) => {
    try {
      dispatch(startLoading);
      console.log(id, data);
      await updateDoc(doc(db, "board", id), {
        title: data.title,
        content: data.content,
      });
      dispatch(submitLoading());
    } catch (err: any) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  };
};

export const addAuthor = (
  author: Author
): ThunkAction<void, RootState, null, BoardAction> => {
  return (dispatch) => {
    dispatch({ type: "ADD_AUTHOR", payload: author });
  };
};
