import React, { useEffect, useReducer } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { FETCH_DONE, FETCH_ERROR, FETCH_START } from '../state/actionTypes/actionTypes'
import { initialState, postReducer } from '../state/postReducer'

const POST_CONTEXT = createContext()

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState)

  useEffect(() => {
    dispatch({type: FETCH_START})
    fetch("http://localhost:5000/posts")
    .then(res => res.json())
    .then(data => {
      dispatch({type: FETCH_DONE, payload: data})
      console.log(data);
    })
    .catch(err => {
      dispatch({type: FETCH_ERROR})
    })
  }, [])
 
  const value = {state, dispatch}
  return (
    <POST_CONTEXT.Provider value={value}>{children}</POST_CONTEXT.Provider>
  )
}

export const usePost = () => {
  const context = useContext(POST_CONTEXT);
  return context
}

export default PostProvider