import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Calendar, Chart, Chart_fill, Chat, Control, Folder, icon, logo, Search, Setting, User } from "../assets";
import { AuthContext } from "../context/AuthProvider";
import Button from "./Button";
const Sidebar = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const Menus = [
        { title: "Inbox", src: Chat },
        { title: "Accounts", src: User, gap: true },
        { title: "Schedule ", src: Calendar },
        { title: "Search", src: Search },
        { title: "Files ", src: Folder, gap: true },
        { title: "Setting", src: Setting },
    ];

    return (
        <>
            <div
                className={`sm:w-20 md:w-32  lg:w-72  bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
                <div className="flex gap-x-4 items-center">
                    <img
                        src={icon}
                        className={`cursor-pointer duration-500 w-10`}
                        alt="logo"
                    />
                    <h1
                        className={`text-dimWhite origin-left font-medium text-xl duration-200 sm:flex hidden sm:scale-0  lg:scale-100  `}
                    >
                        Social{" "}<span className={`text-gradient origin-left font-medium text-xl duration-200 `}>App</span>
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                } `}
                        >
                            <img src={Menu.src} alt="" />
                            <span className={`sm:flex hidden sm:scale-0  lg:scale-100 origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                    <li>
                        <Button styles="sm:flex hidden sm:scale-0  lg:scale-100 justify-center ">Post</Button>
                    </li>
                </ul><div className="rounded-lg  sm:flex sm:scale-70 mt-10 lg:scale-100 origin-left">
                    {
                        user?.uid ?
                            <div className="sm:flex sm:scale-70 items-center gap-2 lg:scale-100">
                                <img className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={user?.photoURL} alt="" />
                                <div className="font-medium dark:text-white sm:flex hidden flex-col sm:scale-0  lg:scale-100 ">
                                    <div>{user?.displayName}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
                                </div>
                            </div>

                            :
                            <FaUser className={`font-bold cursor-pointer text-white text-[32px]`} />
                    }
                </div>

            </div>


        </>
    );
};
export default Sidebar;
