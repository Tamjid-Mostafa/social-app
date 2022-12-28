import React from 'react'
import { FaComment, FaCommentAlt, FaHeart, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostCard = ({post}) => {
  const {image, postBody, postedTime, userEmail, userImage, userName, _id} = post;
  return (
    <>
      <div className="relative flex backdrop-brightness-200 shadow-lg rounded-lg mx-4 my-4 md:mx-auto max-w-md md:max-w-2xl ">
     
        <div className="flex items-start px-4 py-6">
        <small className="absolute top-4 right-6 text-sm text-gray-300">Posted on :{postedTime.slice(11)}</small>
          <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={userImage} alt="avatar" />
          <div className="">
            <div className="relative flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-300 -mt-1">{userName}</h2>
              
            </div>
            <p className="mt-3 text-gray-200 text-sm">
              {postBody.slice(0,20)}{"... "}<Link to={`/post-details/${_id}`} className="text-blue-600">show more..</Link>
            </p>
            <div className="w-fit rounded-lg">
              <img className="rounded-lg" src={image} alt="" />
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex gap-1 mr-2 text-red-600 text-sm items-center">
                <FaHeart className="w-4 h-4 mr-1"/>
                <span className="text-gray-500">8</span>
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