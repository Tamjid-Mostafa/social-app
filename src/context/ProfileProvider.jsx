import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useContext } from 'react'
import { AuthContext } from './AuthProvider';


const PROFILE_CONTEXT = createContext()

const ProfileProvider = ({children}) => {

    const { user, loading, setLoading } = useContext(AuthContext);

    const url = `https://social-app-server-tamjid-mostafa.vercel.app/user?email=${user?.email}`;

  /* Load Post  */
  const {
    data: profile = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["profile", user?.email],
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

  const value = {refetch, profile, isLoading}
  return (
    <PROFILE_CONTEXT.Provider value={value}>{children}</PROFILE_CONTEXT.Provider>
  )
}
export const useProfile = () => {
    const context = useContext(PROFILE_CONTEXT);
    return context
  }

export default ProfileProvider