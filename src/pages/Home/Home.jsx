import React from 'react'
import { Hero, Post } from '../../components'
import styles from '../../style'

const Home = () => {


  return (
    <>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
          <Post />
        </div>
      </div>
    </>
  )
}

export default Home