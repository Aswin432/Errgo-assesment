import { Outlet } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    /**
     * TODO: Complete method to allow sidebar visibility state to be toggled
     */
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/**
       * TODO: Fix this navbar by adding the appropriate props
       */}
      <TopNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 ${
            sidebarVisible ? "w-64" : "w-0"
          } flex-shrink-0 overflow-hidden`}
        >
          <Sidebar visible={sidebarVisible} />
        </div>
        <Outlet />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
