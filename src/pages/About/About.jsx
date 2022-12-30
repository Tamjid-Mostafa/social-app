import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthProvider'
import styles from '../../style'
import { FaPencilAlt } from "react-icons/fa"
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from '../../components/Modal'
import { useQuery } from '@tanstack/react-query'
import { useProfile } from '../../context/ProfileProvider'
const About = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const { refetch, profile, isLoading } = useProfile();
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("");


 



  const handleEdit = () => {
    setShowModal(true)
    setEmail(user?.email)
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About - Social App</title>
        <link rel="" href="" />
      </Helmet>
      <section>
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Media - Social App</title>
            <link rel="" href="" />
          </Helmet>
          {/* {
        isLoading ? <Loader />
          : */}
          <>
            <div className={`${styles.boxWidth}`}>
              <div className="relative flex rounded-lg mx-4 my-4 bg-">
                <main className="profile-page">
                  <section className="relative block min-h-[30vh] ">
                    <div
                      className="absolute top-0 w-full h-full bg-center bg-cover rounded-t-lg"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                      }}
                    >
                      <span
                        id="blackOverlay"
                        className="w-full h-full absolute opacity-50 bg-black-gradient rounded-lg"
                      ></span>
                    </div>
                    <div
                      className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-20"
                    >
                      <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                      >
                        <polygon
                          className="text-gray-300 fill-current"
                          points="2560 0 2560 100 0 100"
                        ></polygon>
                      </svg>
                    </div>
                  </section>
                  <section className="relative py-2 bg-black-gradient-2 rounded-b-lg">
                    <div className="absolute z-[0]   -top-[2rem] left-[17rem]">
                      <div className="absolute z-[1]  h-[20rem] w-[20rem] blue__gradient left-0 right-0" />
                      <div className="absolute z-[1]  h-[20rem] w-[20rem] pink_gradient left-0 right-0" />
                      <div className="absolute z-[1]  h-[20rem] w-[20rem] white__gradient left-0 right-0" />
                    </div>
                    <div className="container mx-auto px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-black-gradient-2 w-full mb-6 shadow-xl rounded-lg ">
                        <div className="px-6">
                          <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                              <div className="relative">
                                <img
                                  alt="..."
                                  src={user?.photoURL}
                                  className="box-shadow shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                  style={{ maxWidth: "150px" }}
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex justify-between">
                              <div className="hidden py-6 px-3 mt-32 sm:mt-0">
                                <Button
                                  styles="uppercase text-white font-bold hover:shadow-md shadow text-xs  py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                >
                                  Connect
                                </Button>
                              </div>
                              <div className="py-6 px-3 mt-32 sm:mt-0">
                                <label htmlFor="" onClick={() => handleEdit()}>
                                  <Button

                                    styles="uppercase text-white font-bold hover:shadow-md shadow text-xs  py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                  >
                                    <FaPencilAlt />
                                  </Button>
                                </label>
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4 lg:order-1">
                              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                                    22
                                  </span>
                                  <span className="text-sm text-gray-200">Friends</span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                                    10
                                  </span>
                                  <span className="text-sm text-gray-200">Photos</span>
                                </div>
                                <div className="lg:mr-4 p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                                    89
                                  </span>
                                  <span className="text-sm text-gray-200">Comments</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-12">
                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-200 mb-2">
                              {profile?.name}
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-gray-200 font-bold uppercase">
                              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-200"></i>{" "}
                              <span>{profile?.location?.city}</span>{", "}<span>{profile?.location?.country}</span>
                            </div>
                            <div className="mb-2 text-gray-300 mt-10">
                              <i className="fas fa-briefcase mr-2 text-lg text-gray-200"></i>
                              {profile?.location?.position}
                            </div>
                            <div className="mb-2 text-gray-300">
                              <i className="fas fa-university mr-2 text-lg text-gray-200"></i>
                              {profile?.university}
                            </div>
                          </div>
                          <div className="mt-10 py-10 border-t border-gray-300 text-center">
                            <div className="flex flex-wrap justify-center">
                              <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed text-gray-200">
                                  {profile?.about}
                                </p>
                                <a
                                  href="#/"
                                  className="font-normal text-pink-500"
                                  onClick={e => e.preventDefault()}
                                >
                                  Show more
                                </a>
                                {
                                  showModal ? <Modal
                                    setShowModal={setShowModal}
                                    showModal={showModal}
                                    email={email}
                                    refetch={refetch}

                                  /> : null
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </>
          {/*  } */}
        </>
      </section>
    </>
  )
}

export default About