import { FETCH_DONE, FETCH_ERROR, FETCH_START, } from "./actionTypes/actionTypes";

export const initialState = {
    loading : false,
    post : [],
    error: false,
};

export const postReducer = (state, action) => {
  switch(action.type){
    case FETCH_START:
        return{
            ...state,
            loading: true,
        };
    case FETCH_DONE:
        return{
            ...state,
            loading: false,
            post: action.payload,
        };
    case FETCH_ERROR:
        return{
            ...state,
            loading: false,
            error: true
        };
    default:
        return state;

  }
};
