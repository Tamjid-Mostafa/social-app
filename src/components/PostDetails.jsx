import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaCommentAlt, FaHeart, FaImage, FaShare, FaSmile } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';
import { usePost } from '../context/PostProvider';
import styles from '../style';
import CommentCard from './CommentCard';
import EmojiCom from './EmojiCom';

const PostDetails = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const fullPost = useLoaderData();
  const { image, postBody, postedTime, userEmail, userImage, userName, _id, like, comments } = fullPost;
  const [liked, setLiked] = useState(!like?.length ? 0 : like?.length)
  const [comment, setComment] = useState(!comments?.length ? 0 : comments?.length)
  const [emoji, setEmoji] = useState(false);
  const { refetch } = usePost();
  /* ------Handle Like----- */
  const handleLike = () => {
    const url = `https://social-app-server-tamjid-mostafa.vercel.app/likes?id=${_id}&email=${user?.email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("social-app token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        /* console.log(data); */
        if (data.modifiedCount > 0) {
          setLiked(liked + data.modifiedCount)
          refetch()
          toast.success("Liked Successfully");
        }
        if (!data.acknowledged) {
          toast.error(data.message)
        }

      });

  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  /* ===Add Comment Data to Database=== */
  const handleComment = (data) => {
    setLoading(true);
    const time = new Date().toLocaleString();
    const post = {
      postBody: data.post,
      postedTime: time,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL
    };
    /* -----Save Comment Data to Database----- */
    const url = `https://social-app-server-tamjid-mostafa.vercel.app/comment?id=${_id}&email=${user?.email}`;
    axios.put(url, post)
      .then((res) => {
        toast.success(`Share post successfully`);
        reset();
        refetch();
        setLoading(false);
        if (res.data.modifiedCount > 0) {
          commentSet(res.data.modifiedCount)
          refetch()
        }
      })
      .catch((err) => {
        console.error(err);
      });

  };

  const commentSet = (count) => {
    setComment(comment + count)
  }


  


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

          <Link to="/">
            <FaArrowLeft className={`font-poppins font-normal text-dimWhite text-[24px] leading-10 mr-5`} />
          </Link>
          <h1 className={`font-poppins font-normal text-dimWhite text-[24px] leading-10`}>
            Post
          </h1>
        </div>
        <>
          <div className={`${styles.boxWidth}`}>
            <div className="relative flex rounded-lg mx-4 my-4 ">

              <div className="flex items-start px-4 py-6">
                <small className="absolute top-4 right-6 text-sm text-gray-300 sm:block hidden">Posted on :{postedTime?.slice(0,10)}</small>
                <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={userImage} alt="avatar" />
                <div className="">
                  <div className="relative flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-300 -mt-1">{userName}</h2>

                  </div>
                  <p className="my-3 text-gray-200 text-sm">
                    {postBody}
                  </p>
                  <div className="w-fit rounded-lg">
                    <img className="rounded-lg" src={image} alt="" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button onClick={handleLike} className={`flex gap-2 mr-2 ${!liked ? "text-red-600" : "text-gray-500"} text-sm items-center`} >
                      <FaHeart className="w-4 h-4 mr-1" />
                      <span className="text-gray-500">{liked}</span>
                    </button>
                    <button className="flex gap-1 mr-2 text-gray-500 text-sm items-center">
                      <FaCommentAlt className="w-4 h-4 mr-1" />
                      <span>{comment}</span>
                    </button>
                    <button className="flex gap-1 mr-2 text-gray-500 text-sm items-center ">
                      <FaShare />
                      <span>share</span>
                    </button>
                    <div className="flex gap-1 mr-2 text-gray-500 text-sm items-center ">
                      <small className="text-sm text-gray-300 sm:hidden block">Posted on :{postedTime.slice(0, 10)}</small>
                    </div>
                  </div>

                  <div className="mt-4 flex-1 font-medium dark:text-white  w-full">

                    <form
                      onSubmit={handleSubmit(handleComment)}
                    >

                      <textarea
                        disabled={!user?.uid ? true : false}
                        {...register("post")}
                        id="chat" rows="1" className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..." />
                      {errors.text && (
                        <p className="text-red-500">{errors.text.message}</p>
                      )}

                      <div className="flex justify-between" id="comment">
                        <div className="inline-flex gap-2 md:gap-4 sm:mx-2 mx-4 p-2.5 w-full text-lg text-cyan-400 lg:text-2xl  rounded-lg  bg-primary ">
                          <label htmlFor="image">
                            <FaImage />
                            <input
                              disabled
                              /* disabled={!user?.uid ? true : false}
                              {...register("image")} */
                              className="hidden "
                              type="file"
                              id="image"
                              accept="image/*"
                            />
                            {errors.image && (
                              <p className="text-red-500">{errors.image.message}</p>
                            )}
                          </label>
                          <>
                            <FaSmile onClick={() => setEmoji(!emoji)} />
                            {
                              emoji && <EmojiCom />
                            }
                          </>
                        </div>
                        <button
                          className={`inline-flex justify-center p-2 
                           text-blue-600 rounded-full cursor-pointer
                          ${!user?.uid ? "disabled:cursor-not-allowed disabled:text-gray-600" : ""} hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600`}>
                          Post
                        </button>
                      </div>
                    </form>

                  </div>
                  <div className="my-4">
                            {
                              comments?.map((comment, index) => (
                                <CommentCard 
                                key={index}
                                comment={comment}
                                />
                              ))
                            }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

      </section>
      {/*  } */}
    </>
  )
}

export default PostDetails