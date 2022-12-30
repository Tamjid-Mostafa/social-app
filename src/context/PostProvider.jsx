import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { createContext } from 'react'

const POST_CONTEXT = createContext()

const PostProvider = ({ children }) => {

  const url = `https://social-app-server-tamjid-mostafa.vercel.app/posts`;

  /* Load Post  */
  const {
    data: post = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await axios.get(url, {
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("social-app token")}`,
        },
      });
      return res.data;
      
    },
  });


 
  const value = {refetch, post, isLoading}
  return (
    <POST_CONTEXT.Provider value={value}>{children}</POST_CONTEXT.Provider>
  )
}

export const usePost = () => {
  const context = useContext(POST_CONTEXT);
  return context
}

export default PostProvider