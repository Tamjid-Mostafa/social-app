import React, { createContext, useEffect, useReducer, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import app from '../firebase/firebase.config';
import { initialState, reducer } from '../state/userReducer';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const [state, dispatch] = useReducer(reducer, initialState)
    /* ----------------Google Sign In------------ */
  const providerGoogleSignIn = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

    /* -----------Create User------------ */
    const providerCreateUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };

  /* -----------Log In with Email Password------------ */
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* -----------User Update------------ */
  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  /* -----------Auth State Change------------ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
 
  /* -----------Sign Out------------ */
  const providerSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };


  const authInfo = {
    user,
    loading,
    setLoading,
    providerCreateUser,
    signIn,
    providerGoogleSignIn,
    updateUserProfile,
    providerSignOut,

  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider