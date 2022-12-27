import React from 'react'
import { Hero, Post, PostCard } from '../../components'
import styles from '../../style'

const Home = () => {
  return (
    <>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <Post />
      <PostCard />
    </>
  )
}

export default Home