import React, { useState, useEffect } from "react";
import { useWeatherStore } from "@/app/store/weather-store";
import CloseButton from "./CloseButton";
import styles from "./Notification.module.css";

const Notification = () => {
  const {
    systemMessage: {
      status: systemStatus,
      message: systemMessage,
      idCounter: systemIdCounter,
    },
  } = useWeatherStore();

  const [showNotification, setShowNotification] = useState(false);
  const colorVariants = {
    success: `alert alert-success fixed bottom-0 right-0 m-4 z-50 w-auto p-4 rounded-md shadow-md transition-opacity ease-in duration-700 opacity-100`,
    error: `alert alert-error fixed bottom-0 right-0 m-4 z-50 w-auto p-4 rounded-md shadow-md transition-opacity ease-in duration-700 opacity-100`,
  };
  useEffect(() => {
    let timer;
    let time;
    if (systemMessage) {
      setShowNotification(true);

      if (systemStatus === "success") {
        time = 2000;
      } else if (systemStatus === "error") {
        time = 5000;
      }

      timer = setTimeout(() => {
        setShowNotification(false);
      }, time); // Hide after 5 seconds
    } else {
      setShowNotification(false); // Clear notification if no system message
    }
    return () => clearTimeout(timer); // Cleanup the timer on component unmount or when systemMessage changes
  }, [systemIdCounter]);

  return (
    <div>
      {showNotification && (
        <div className={`${colorVariants[systemStatus]}`}>
          {systemMessage}
          <div className="hidden md:block">
            <button
              className={`btn btn-outline btn-circle btn-sm btn-light hover:bg-gray-100 hover:text-gray-800 `}
              onClick={() => setShowNotification(false)}
            >
              <CloseButton />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
