import React, { useState, useEffect } from "react";
import { useWeatherStore } from "@/app/store/weather-store";
import CloseButton from "../icons/CloseButton";

import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import ErrorIcon from "../icons/ErrorIcon";
import SuccessIcon from "../icons/SuccessIcon";

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
    success:
      "alert alert-success fixed bottom-0 right-0 m-4 z-50 w-auto md:bottom-0 p-4 rounded-md shadow-md transition-opacity inset-x-0",
    error:
      "alert alert-error fixed bottom-0 right-0 m-4 z-50 w-auto md:bottom-0 p-4 rounded-md shadow-md transition-opacity inset-x-0",
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

  // Define animation variants
  const fadeInOutVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }, // Increase duration for exit
  };

  const modifiedVariants =
    systemStatus === "success"
      ? {
          ...fadeInOutVariants,
          visible: {
            ...fadeInOutVariants.visible,
            transition: { duration: 0.3 },
          }, // Increase duration for success status
        }
      : fadeInOutVariants;

  return (
    <div>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            key={systemIdCounter}
            className={`${colorVariants[systemStatus]}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modifiedVariants}
          >
            {systemStatus === "success" ? <SuccessIcon /> : <ErrorIcon />}
            {systemMessage}
            <div className="hidden md:block">
              <button
                className={`btn btn-outline btn-circle btn-sm btn-light hover:bg-gray-100 hover:text-gray-800 `}
                onClick={() => setShowNotification(false)}
              >
                <CloseButton />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
