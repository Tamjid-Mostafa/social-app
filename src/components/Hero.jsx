import React, { useContext, useState } from 'react'
import { FaImage, FaRegLaugh, FaSmile } from 'react-icons/fa';
import { AuthContext } from '../context/AuthProvider';
import styles, { layout } from '../style'
import { useForm } from 'react-hook-form';
import EmojiCom from './EmojiCom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { usePost } from '../context/PostProvider';
import { Helmet } from 'react-helmet';



const Hero = () => {

  const { user, loading, setLoading } = useContext(AuthContext);
  const [emoji, setEmoji] = useState(false);
  const { refetch, isLoading } = usePost();


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  /* ===Add Product Data to Database=== */
  const handleAddPost = (data) => {
    setLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${"527cb8c6aafc33970b1b5fa05f4bc3ac"}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const time = new Date().toLocaleString();
          const post = {
            postBody: data.post,
            location: data.location,
            image: imageData.data.url,
            postedTime: time,
            userName: user.displayName,
            userEmail: user.email,
            userImage: user.photoURL
          };
          /* -----Save product to the----- */
          axios.post("http://localhost:5000/add-post", post)
            .then((res) => {
              toast.success(`Share post successfully`);
              reset();
              refetch();
              setLoading(false);


            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
  };


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - Social App</title>
        <link rel="" href="" />
      </Helmet>
      {
        loading ? <Loader />
          :
          <section id="home" className={`${""}`}>
            <div className="">
              <div>
                <h1 className={`${styles.heading4}`}>
                  Share Something...
                </h1>
              </div>
              <div>
                <>
                  <div className={`relative ${styles.flexStart}`}>
                    <img className={`relative ${styles.flexStart} p-1 w-10 h-10 mt-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`} src={user?.photoURL} alt="" />
                    <div className="flex-1 font-medium dark:text-white  w-full">

                      <form
                        onSubmit={handleSubmit(handleAddPost)}
                      >

                        <textarea
                          disabled={!user?.uid ? true : false}
                          {...register("post")}
                          id="chat" rows="1" className="block sm:mx-2 mx-4 p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-primary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..." />
                        {errors.text && (
                          <p className="text-red-500">{errors.text.message}</p>
                        )}

                        <div className="flex justify-between">
                          <div className="inline-flex gap-2 md:gap-4 sm:mx-2 mx-4 p-2.5 w-full text-lg text-cyan-400 lg:text-2xl  rounded-lg  bg-primary ">
                            <label htmlFor="image">
                              <FaImage />
                              <input

                                disabled={!user?.uid ? true : false}
                                {...register("image", {
                                  required: "Image is Required",
                                })}
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
                  </div>

                </>
              </div>
            </div>

          </section>
      }
    </>
  )
}

export default Hero