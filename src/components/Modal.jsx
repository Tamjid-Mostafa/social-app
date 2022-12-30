import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../api/auth';
import { AuthContext } from '../context/AuthProvider';
import Button from './Button';

const Modal = ({ setShowModal, email, refetch, showModal }) => {
  const { user, updateUserProfile, setLoading } =
    useContext(AuthContext);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleEdit = (data) => {
    setSignupError("");
    /* ----Upload Image---- */
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=527cb8c6aafc33970b1b5fa05f4bc3ac`;
    fetch(url, {
      method: "POST",
      body: formData,
    })

      .then((res) => res.json())
      .then((imageData) => {
        const userInfo = {
          displayName: data.name,
          photoURL: imageData.data.display_url,
        };
        updateUserProfile(userInfo)
          .then(() => { })
          .catch((err) => {
            console.error(err);
            setSignupError(err.message);
          });
        if (imageData.success) {
          const userInfo = {
            name: data.name,
            position: data.position,
            university: data.university,
            location: { city: data.city, country: data.country },
            email: data.email,
            image: imageData.data.url,
            birthdate: data.birthdate,
            about: data.about
          };
        
        /* User Info Save To DataBase */
        axios.put(
          `https://social-app-server-tamjid-mostafa.vercel.app/users?email=${user?.email}`,
          userInfo
        )
          .then((res) => {
            if (res.statusText === "OK") {
              refetch();
              toast.success(`${userInfo?.name} save changes succesfully`);
              setAuthToken(userInfo);
              /* navigate("/about"); */
              setLoading(false);
            }
            const firstname = userInfo.name.split(" ")[0];
            toast.success(`Hello! ${firstname}
                  Thank you for interest in Social App. `);
          })
          .catch((err) => {
            console.error(err);
          });
        };
      })
  };







  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black-gradient outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 gap-x-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-white">
                Your Information
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-white  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent  font-bold  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form
                onSubmit={handleSubmit(handleEdit)}
                action=""
                className="mt-10 space-y-8 dark:text-white"
              >
                <div className="flex items-center justify-between gap-3">

                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="text"
                      {...register("name", {
                        required: "Please provide your name",
                      })}
                      placeholder="Full Name"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                    {errors.name && (
                      <p className="text-red-600" role="alert">
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="text"
                      {...register("position", {
                        required: "Please provide your position",
                      })}
                      placeholder="Position"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                    {errors.position && (
                      <p className="text-red-600" role="alert">
                        {errors.position?.message}
                      </p>
                    )}
                  </div>

                </div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="file"
                    {...register("image", {
                      required: "Profile Picture is Required",
                    })}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.img && (
                    <p className="text-red-500">{errors.img.message}</p>
                  )}
                </div>


                <div className="flex items-center justify-between gap-3">

                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="text"
                      {...register("city", {
                        required: "Please provide where you live",
                      })}
                      placeholder="City"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                    {errors.city && (
                      <p className="text-red-600" role="alert">
                        {errors.city?.message}
                      </p>
                    )}
                  </div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="text"
                      {...register("country", {
                        required: "Please provide your country",
                      })}
                      placeholder="Country"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                    {errors.country && (
                      <p className="text-red-600" role="alert">
                        {errors.country?.message}
                      </p>
                    )}
                  </div>

                </div>
                <div className="flex items-center justify-between gap-3">

                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="text"
                      {...register("university")}
                      placeholder="University"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                    {errors.university && (
                      <p className="text-red-600" role="alert">
                        {errors.university?.message}
                      </p>
                    )}
                  </div>
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="text"
                      {...register("birthdate", {
                        required: "Please provide your country",
                      })}
                      placeholder="Birth Date"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                    {errors.birthdate && (
                      <p className="text-red-600" role="alert">
                        {errors.birthdate?.message}
                      </p>
                    )}
                  </div>

                </div>


                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <textarea
                    id=""
                    type="text"
                    {...register("about")}
                    placeholder="About Yourself"
                    className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                  />
                  {errors.about && (
                    <p className="text-red-600" role="alert">
                      {errors.about?.message}
                    </p>
                  )}
                </div>

                <>
                  <div className=" p-6 border-t border-solid border-slate-200 rounded-b">
                    <label htmlFor="">
                      <Button className="w-full">
                        <span className="text-base font-semibold text-white">
                          Save Changes
                        </span>
                      </Button>
                    </label>
                    {/*  <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
               
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Save Changes
              </button> */}
                    {/*footer*/}


                  </div>
                </>
              </form>
            </div>

          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default Modal