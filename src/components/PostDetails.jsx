import React from 'react'
import { Helmet } from 'react-helmet'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import styles from '../style';

const PostDetails = () => {
  const {image, postBody, postedTime, userEmail, userImage, userName, _id} = useLoaderData();


  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Media - Social App</title>
        <link rel="" href="" />
      </Helmet>
      {/* {
        isLoading ? <Loader />
          : */}
          <section className={``}>
            <div className={`flex  items-center`}>
              
              <Link onClick={navigate(from, { replace: true })}>
               <FaArrowLeft className={`font-poppins font-normal text-dimWhite text-[24px] leading-[30.8px] mr-5`}/>
              </Link>
              <h1 className={`font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]`}>
               Post
              </h1>
            </div>
            <>
              <div className={`${styles.boxWidth}`}>
                
              </div>
            </>

          </section>
     {/*  } */}
    </>
  )
}

export default PostDetails