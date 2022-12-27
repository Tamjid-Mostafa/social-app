import React from 'react'
import styles, { layout } from '../style'

const Post = () => {
  return (
    <section className={`${layout.section}`}>
      <div className="bg-slate-400 rounded-xl h-[20vh]">
        <h1 className={`${styles.heading2}`}>
          Hello, World
        </h1>
      </div>
      
    </section>
  )
}

export default Post