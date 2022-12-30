import React from 'react'
import { Helmet } from 'react-helmet'
import { Loader, PostCard } from '../../components';
import { usePost } from '../../context/PostProvider';
import styles from '../../style';

const MostLiked = () => {
    const { isLoading, post } = usePost();




  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Media - Social App</title>
        <link rel="" href="" />
      </Helmet>
      {
        isLoading ? <Loader />
          :
          <section className={``}>
            <div>
              <h1 className={`${styles.heading4}`}>
                Media
              </h1>
            </div>
            <>
              <h1 className={`${styles.boxWidth}`}>
                {
                  post?.filter((p) => p?.like?.length > 2)
                  .map((p) => <PostCard
                    key={p._id} post={p} />)
                }
              </h1>
            </>

          </section>
      }
    </>
  )
}

export default MostLiked