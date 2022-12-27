import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "../style";

const Main = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth} flex relative`}>
          <Sidebar />

          <div className="flex-1 h-screen">
            <div className={``}>
              <div className={``}>
                <Header />
              </div>
            </div>

            <div className={``}>
              <div className={``}>
                <Outlet />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
