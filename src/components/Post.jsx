import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { usePost } from '../context/PostProvider'
import styles, { layout } from '../style'
import Loader from './Loader'
import PostCard from './PostCard'

const Post = () => {
  const { state, loading, error } = usePost();
  console.log(state.post);
  const posts = state.post;

  return (
    <>
      {
        loading ? <Loader />
          :
          <section className={`${styles.flexStart}`}>
            <>
              <h1 className={`${styles.heading2}`}>
                {
                  posts.map(post => <PostCard
                    key={post._id} post={post} />)
                }
              </h1>
            </>

          </section>
      }
    </>
  )
}

export default Post