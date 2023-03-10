import React from "react";

const Button = ({ styles, children }) => (
  <button className={`py-4 px-6 mt-6 font-poppins font-medium text-[18px] text-white bg-blue-gradient rounded-full w-full outline-none active:bg-gray-600 transform transition-all active:scale-95 hover:scale-105 duration-300  ${styles}`}>
    {children}
  </button>
);

export default Button;
