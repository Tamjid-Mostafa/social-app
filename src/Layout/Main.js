import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles, { layout } from "../style";

const Main = () => {
  return (
    <div className="bg-primary w-full overflow-hidden relative">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth} flex relative`}>
          <Sidebar />

          <div className="flex-1 h-screen">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
      <section className={`${layout.section} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Main;
