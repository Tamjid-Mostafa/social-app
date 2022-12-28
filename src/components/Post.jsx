import React from 'react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { AuthContext } from '../context/AuthProvider'
import { usePost } from '../context/PostProvider'
import styles, { layout } from '../style'
import Loader from './Loader'
import PostCard from './PostCard'

const Post = () => {
  const { state, loading, error, post } = usePost();



  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Post - Social App</title>
        <link rel="" href="" />
      </Helmet>
      {
        loading ? <Loader />
          :
          <section className={`${styles.flexStart}`}>
            <>
              <h1 className={`${styles.heading2}`}>
                {
                  post.map(p => <PostCard
                    key={p._id} post={p} />)
                }
              </h1>
            </>

          </section>
      }
    </>
  )
}

export default Post