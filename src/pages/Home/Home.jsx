import React from 'react'
import { Helmet } from 'react-helmet'
import { Hero, Post } from '../../components'
import styles from '../../style'

const Home = () => {


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - Social App</title>
        <link rel="" href="" />
      </Helmet>
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