import { useContext, useState } from "react";
import { FaArrowsAlt, FaBars, FaPen, FaPenAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Calendar, Chart, Chart_fill, Chat, Control, Folder, icon, logo, Search, Setting, User } from "../assets";
import { AuthContext } from "../context/AuthProvider";
import Button from "./Button";
import Modal from "./Modal";
const Sidebar = () => {
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = useState(false)
    
    const { user, providerSignOut } = useContext(AuthContext);

    /* Handle Logout */

    const handleLogout = () => {
        localStorage.removeItem("social-app token")
        providerSignOut()
            .then(() => { })
            .catch((err) => console.error(err));
    };


    const Menus = [
        { title: "Inbox", to: "Inbox", src: Chat },
        { title: "Top Post", to: "top-post", src: User, gap: true },
        { title: "Schedule ", to: "Schedule ", src: Calendar },
        { title: "Search", to: "Search", src: Search },
        { title: "About ", to: "/about ", src: Folder, gap: true },
    ];

    return (
        <>
            <div
                className={`sm:block ${open ? "" : "hidden"} sm:w-20 md:w-32  lg:w-72  bg-dark-purple  p-5  pt-8 duration-300`}
            >
                <div className="flex gap-x-4 items-center">
                    <img
                        src={icon}
                        className={`cursor-pointer duration-500 w-10 sm:block hidden`}
                        alt="logo"
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 sm:flex hidden lg:scale-100 sm:scale-95 scale-0  `}
                    >
                        Social{" "}<span className={`text-gradient origin-left font-medium text-xl duration-200 `}>App</span>
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <Link key={index} to={Menu.to}>
                            <li

                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-[0.5rem] sm:text-lg lg:text-2xl items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                <img src={Menu.src} alt="" />
                                <span className={`sm:flex text-[0.5rem] sm:text-lg lg:text-2xl sm:scale-10  lg:scale-100 origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                    {
                        user?.uid ? <li onClick={handleLogout} className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 bg-light-white lg:scale-100 sm:scale-95 scale-20`}>
                            <img src={Setting} alt="" />
                            <span className={`sm:flex text-[0.5rem] sm:scale-10  lg:scale-100 origin-left duration-200`}>
                                Log Out
                            </span>
                        </li> : <Link to="/login" className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 bg-light-white`}>
                            <img src={Setting} alt="" />
                            <span className={`sm:flex hidden sm:scale-0  lg:scale-100 origin-left duration-200`}>
                                Log In
                            </span>
                        </Link>
                    }
                    <li /* onClick={() => setShowModal(!showModal)} */
                    >
                        <Button styles="ss:flex hidden lg:scale-100 sm:scale-75 scale-0 justify-center ">Post</Button>

                    </li>
                    <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center`}>
                        {
                            user?.uid ?
                                <div className="flex rounded-md  cursor-pointer text-sm items-center gap-x-4 mt-2 bg-light-white lg:scale-100 sm:scale-95 scale-0">
                                    <img className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={user?.photoURL} alt="" />
                                    <div className="font-medium dark:text-white sm:flex hidden flex-col sm:scale-0  lg:scale-100 ">
                                        <div>{user?.displayName}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
                                    </div>
                                </div>

                                :
                                <FaUser className={`font-bold cursor-pointer text-white text-[32px]`} />
                        }
                    </li>
                </ul>
                <div className="rounded-lg   mt-10 sm:flex hidden sm:scale-0  lg:scale-100 origin-left duration-200">

                </div>

            </div>

            {/* {
                showModal ? <Modal setShowModal={setShowModal} showModal={showModal} /> : null
            } */}
            <label htmlFor="sidebar" onClick={() => setOpen(!open)}>
                <Button id="sidebar" styles="fixed shadow-4xl z-50 bottom-[20px] right-[20px] w-16 h-16 sm:hidden block justify-center  "><>{open ? <FaArrowsAlt /> : <FaBars />}</></Button>
            </label>
        </>
    );
};
export default Sidebar;
