import { FETCHING_START } from "./actionTypes/actionTypes";

export const initialState = {
    user : null,
    loading : false
};
export const reducer = (state, action) => {
  switch(action.type){
    case FETCHING_START:
        return{};
    default:
        return state;

  }
};
