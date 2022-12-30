import React, { useState } from 'react'
import { FaCommentAlt, FaHeart, FaShare } from 'react-icons/fa'

const CommentCard = ({comment}) => {
const [like, setLike] = useState(0)

const {userName, postBody, userImage} = comment;



  return (
    <>
    <div className="relative flex backdrop-brightness-200 shadow-lg rounded-lg mx-4 my-4 md:mx-auto max-w-md md:max-w-2xl ">
   
      <div className="flex items-start px-4 py-6">
      <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={userImage} alt="avatar" />
        <div className="">
          <div className="relative flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-300 -mt-1">{userName}</h2>
            
          </div>
          <p className="mt-3 text-gray-200 text-sm">
            {postBody}{"... "}
          </p>
          {/* <div className="w-fit rounded-lg">
            <img className="rounded-lg w-12 h-12" src={userImage} alt="" />
          </div> */}
          {/* <div className="mt-4 flex items-center">
            <div className="flex gap-1 mr-2 text-red-600 text-sm items-center">
            <button onClick={(prevState) => setLike(prevState + 1)} className={`flex gap-2 mr-2 text-red-600 text-sm items-center`} >
                    <FaHeart className="w-4 h-4 mr-1" />
                    <span className="text-gray-500">{!like?.length ? 0 : like?.length}</span>
                  </button>
            </div>
            <div className="flex gap-1 mr-2 text-gray-500 text-sm items-center">
              <FaCommentAlt className="w-4 h-4 mr-1" />
              <span>8</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>

  </>
  )
}

export default CommentCard