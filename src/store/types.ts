export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUt";
export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";
export const SET_ERROR = "SET_ERROR";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_SUBMITTED = "SET_SUBMITTED";
export const FETCH_BOARD = "FETCH_BOARD";
export const FETCH_ALL_BOARD = "FETCH_ALL_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const EDIT_BOARD = "EDIT_BOARD";
export const ADD_AUTHOR = "ADD_AUTHOR";
// Page State
export interface PageState {
  loading: boolean;
  error: string;
  success: string;
  submitted: boolean;
}

// Page Actions
interface StartLoadingAction {
  type: typeof START_LOADING;
}

interface EndLoadingAction {
  type: typeof END_LOADING;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface setSubmittedAction {
  type: typeof SET_SUBMITTED;
  payload: boolean;
}

export type PageAction =
  | StartLoadingAction
  | EndLoadingAction
  | SetErrorAction
  | SetSuccessAction
  | setSubmittedAction;

// Auth Types
export interface User {
  firstName: string;
  email: string;
  id: string;
  createdAt: any;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  needVerification: boolean;
}

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Auth Actions
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface NeedVerificationAction {
  type: typeof NEED_VERIFICATION;
}

export type Author = {
  firstName: string;
  email: string;
  id: string;
};

export type AuthAction =
  | SetUserAction
  | SignOutAction
  | SetErrorAction
  | NeedVerificationAction
  | SetSuccessAction;

export interface Board {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: any;
}

export interface BoardState {
  boardList: Board[];
  board: Board | null;
  authorList: Author[];
}

export interface registerData {
  title: string;
  content: string;
}

// board actions
interface fetchBoardAction {
  type: typeof FETCH_BOARD;
  payload: Board;
}

interface fetchAllBoardAction {
  type: typeof FETCH_ALL_BOARD;
  payload: Board[];
}

interface deleteBoardAction {
  type: typeof DELETE_BOARD;
  payload: string;
}

interface editBoardAction {
  type: typeof EDIT_BOARD;
  payload: Board;
}

interface addAuthorAction {
  type: typeof ADD_AUTHOR;
  payload: Author;
}

export type BoardAction =
  | fetchBoardAction
  | fetchAllBoardAction
  | deleteBoardAction
  | editBoardAction
  | addAuthorAction;
