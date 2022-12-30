import React from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { usePost } from "../context/PostProvider";
import styles, { layout } from "../style";

const Main = () => {
  const {loading} = usePost();
  return (
    <>
    {
      loading ? <Loader />
      :
      <div className="bg-primary w-full overflow-hidden relative">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth} flex `}>
          <Sidebar />

          <div className="flex-1">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default Main;
