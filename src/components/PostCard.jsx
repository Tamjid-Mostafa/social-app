import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCommentAlt, FaHeart, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PostCard = ({post, refetch}) => {
  const { user } = useContext(AuthContext);
  const {image, postBody, postedTime, userEmail, userImage, userName, _id, like} = post;
  const [liked, setLiked] = useState(!like?.length ? 0 : like?.length)
  /* const [comment, setComment] = useState(!comments?.length ? 0 : comments?.length) */

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
        if (!data.acknowledged){
          toast.error(data.message)
        }
        
      });
      
  };





  return (
    <>
      <div className="relative flex bg-primary transition-300 hover:scale-105 duration-500 rounded-lg mx-4 my-4 md:mx-auto max-w-md md:max-w-2xl ">
     
        <div className="flex items-start px-4 py-6">
        <small className="absolute top-4 right-6 text-sm text-gray-300"><span className="md:hidden hidden ">Posted on :</span>{postedTime?.slice(11)}</small>
          <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={userImage} alt="avatar" />
          <div className="">
            <div className="relative flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-300 -mt-1">{userName}</h2>
              
            </div>
            <p className="mt-3 text-gray-200 text-sm">
              {postBody?.slice(0,20)}{"... "}<Link to={`/post-details/${_id}`} className="text-blue-600">show more..</Link>
            </p>
            <div className="w-fit rounded-lg">
              <img className="rounded-lg" src={image} alt="" />
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex gap-1 mr-2 text-red-600 text-sm items-center">
              <button onClick={handleLike} className={`flex gap-2 mr-2 ${!liked ? "text-red-600" : "text-gray-500"} items-center`} >
                      <FaHeart className="w-4 h-4 mr-1" />
                      <span className="text-gray-500">{liked}</span>
                    </button>
              </div>
              <div className="flex gap-1 mr-2 text-gray-500 text-sm items-center">
                <FaCommentAlt className="w-4 h-4 mr-1" />
                <span>8</span>
              </div>
              <div className="flex gap-1 mr-2 text-gray-500 text-sm items-center ">
                <FaShare />
                <span>share</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default PostCard