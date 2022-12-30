import { GoogleAuthProvider } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsGoogle } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthProvider'
import axios from "axios";
import styles from '../../style'
import toast from 'react-hot-toast'
import { setAuthToken } from '../../api/auth'

const Register = () => {
  const { providerGoogleSignIn, providerCreateUser, updateUserProfile, setLoading } =
    useContext(AuthContext);
  const [signupError, setSignupError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  /* -----------------Google Signin------------------ */
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    providerGoogleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        if (user.uid) {
          const userInfo = {
            name: user.displayName,
            email: user.email,
          };

          console.log(userInfo);
          /*User Info Save To DataBase*/
          axios.post(
            "https://social-app-server-tamjid-mostafa.vercel.app/users",

            userInfo
          )
            .then((res) => {

              const firstname = userInfo.name.split(" ")[0];
              toast.success(`Hello! ${firstname}
              Thank you for interest in Your Moto. `);
              setAuthToken(userInfo);
              navigate(from, { replace: true });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((error) => console.error(error));
  };



  const handleSignUp = (data) => {
    setLoading(true);
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
        providerCreateUser(data.email, data.password)
          .then((result) => {
            const userInfo = {
              displayName: data.name,
              photoURL: imageData.data.display_url,
            };
            updateUserProfile(userInfo)
              .then(() => {})
              .catch((err) => {
                console.error(err);
                setSignupError(err.message);
              });
              if (imageData.success) {
                const userInfo = {
                  name: data.name,
                  email: data.email,
                  role: data.buyer_or_seller,
                  image: imageData.data.url,
                };
                /* User Info Save To DataBase */
                axios.post(
                  "https://social-app-server-tamjid-mostafa.vercel.app/users",

                  userInfo
                )
                .then((res) => {
                  const firstname = userInfo.name.split(" ")[0];
                  toast.success(`Hello! ${firstname}
                  Thank you for interest in Social App. `);
                  setAuthToken(userInfo);
                  navigate(from, { replace: true });
                  setLoading(false);
                })
                .catch((err) => {
                  console.error(err);
                });
              }
            })
          .catch((error) => console.error(error));
        });
      };

    return (
      <>
        <section className={`${styles.flexCenter} ${styles.boxWidth}`}>
          <div className="mx-auto h-full sm:w-max">
            <div className="m-auto  py-12">
              <div className="mt-12 rounded-3xl border  dark:border-gray-700 mx-6 sm:-mx-10 p-8 sm:p-10">
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Register
                </h3>
                <div className="mt-12">
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full h-11 rounded-full border border-gray-300/75"
                  >
                    <div className="w-max mx-auto flex items-center justify-center space-x-4">
                      <BsGoogle className="text-cyan-400" />
                      <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
                        With Google
                      </span>
                    </div>
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(handleSignUp)}
                  action=""
                  className="mt-10 space-y-8 dark:text-white"
                >
                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="text"
                      {...register("name", {
                        required: "Please provide your name",
                      })}
                      placeholder="Your Name"
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

                  <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="email"
                      {...register("email", {
                        required: "Email Address is required",
                      })}
                      placeholder="Email"
                      className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
                    />
                    {errors.email && (
                      <p className="text-red-600" role="alert">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                      <input
                        id=""
                        type="Your password"
                        {...register("password", {
                          required: "Password is Required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be atleast 6 charecters or longer",
                          },
                        })}
                        placeholder="Password"
                        className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-400"
                      />
                      {errors.password && (
                        <p className="text-red-600" role="alert">
                          {errors.password?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      {signupError && (
                        <p className="text-red-600">
                          {signupError.slice(22, -2)}
                        </p>
                      )}
                    </div>
                    <button type="reset" className="-mr-3 w-max p-3">
                      <span className="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                        Already have an account?{" "}
                        <Link className="text-secondary" to="/login">
                          Log In
                        </Link>
                      </span>
                    </button>
                  </div>

                  <div>
                    <Button className="w-11">
                      <span className="text-base font-semibold text-white dark:text-gray-900">
                        Sign Up
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
              <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
                <div className="space-x-4 text-center">
                  <span>Your Moto</span>
                  <Link
                    href="#"
                    className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                  >
                    Contact
                  </Link>
                  <Link
                    href="#"
                    className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                  >
                    Privacy & Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  export default Register