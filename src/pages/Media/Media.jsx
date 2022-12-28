import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { Loader, PostCard } from '../../components';
import { AuthContext } from '../../context/AuthProvider';
import { usePost } from '../../context/PostProvider';
import styles from '../../style';

const Media = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/user-posts?email=${user?.email}`;

  /* Load Post  */
  const {
    data: post = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["post", user?.email],
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


  console.log(post);

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

export default Media