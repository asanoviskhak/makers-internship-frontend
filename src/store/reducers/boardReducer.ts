import {
  BoardAction,
  BoardState,
  DELETE_BOARD,
  EDIT_BOARD,
  FETCH_ALL_BOARD,
  FETCH_BOARD,
  ADD_AUTHOR,
} from "../types";

const initialState: BoardState = {
  boardList: [],
  board: null,
  authorList: [],
};

const boardReducer = (state = initialState, action: BoardAction) => {
  switch (action.type) {
    case FETCH_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case FETCH_ALL_BOARD:
      return {
        ...state,
        boardList: action.payload,
      };
    case DELETE_BOARD:
      return {
        ...state,
        boardList: state.boardList?.filter(
          (board) => board.id !== action.payload
        ),
      };
    case EDIT_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case ADD_AUTHOR:
      const { authorList } = state;
      if (authorList.find((author) => author.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        authorList: [...state.authorList, action.payload],
      };
    default:
      return state;
  }
};

export default boardReducer;
