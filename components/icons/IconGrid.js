import React from "react";
import { IoIosMegaphone } from "react-icons/io";
import { IoRainy } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";

const IconGrid = () => {
  return (
    <>
      <div className="flex flex-col gap-4 transition-transform duration-500 hover:scale-105">
        <h1 className="text-2xl md:text-4xl">1.</h1>
        <div className="flex flex-row gap-2">
          <div className="relative">
            <IoIosMegaphone className="w-12 h-12 text-black md:w-20 md:h-20" />
            <IoCheckmark className="absolute w-5 h-5 text-green-500 md:w-10 md:h-10 left-7 top-10 md:left-10 md:top-14" />
          </div>
          <div className="relative">
            <IoRainy className="w-12 h-12 text-black md:w-20 md:h-20" />
            <IoCheckmark className="absolute w-5 h-5 text-green-500 md:w-10 md:h-10 left-7 top-10 md:left-10 md:top-14" />
          </div>
        </div>
        <p className="text-base md:text-xl">예보 ✅ 강수 ✅</p>
      </div>
      <div className="flex flex-col gap-4 transition-transform duration-500 hover:scale-105">
        <h1 className="text-2xl md:text-4xl">2.</h1>
        <div className="flex flex-row gap-2">
          <div className="relative">
            <IoIosMegaphone className="w-12 h-12 text-black md:w-20 md:h-20" />
            <IoCheckmark className="absolute w-5 h-5 text-green-500 md:w-10 md:h-10 left-7 top-10 md:left-10 md:top-14" />
          </div>
          <div className="relative">
            <IoRainy className="w-12 h-12 text-black md:w-20 md:h-20" />
            <IoClose className="absolute w-5 h-5 text-red-500 md:w-10 md:h-10 left-7 top-10 md:left-12 md:top-14" />
          </div>
        </div>
        <p className="text-base md:text-xl">예보 ✅ 강수 ❌</p>
      </div>
      <div className="flex flex-col gap-4 transition-transform duration-500 hover:scale-105">
        <h1 className="text-2xl md:text-4xl">3.</h1>
        <div className="flex flex-row gap-2">
          <div className="relative">
            <IoIosMegaphone className="w-12 h-12 text-black md:w-20 md:h-20" />
            <IoClose className="absolute w-5 h-5 text-red-500 md:w-10 md:h-10 left-7 top-10 md:left-12 md:top-14" />
          </div>
          <div className="relative">
            <IoRainy className="w-12 h-12 text-black md:w-20 md:h-20" />
            <IoCheckmark className="absolute w-5 h-5 text-green-500 md:w-10 md:h-10 left-7 top-10 md:left-10 md:top-14" />
          </div>
        </div>
        <p className="text-base md:text-xl">예보 ❌ 강수 ✅</p>
      </div>
      <div className="flex flex-col gap-4 transition-transform duration-500 hover:scale-105">
        <h1 className="text-2xl md:text-4xl">4.</h1>
        <div className="flex flex-row gap-2">
          <div className="relative">
            <IoIosMegaphone className="w-12 h-12 text-black md:w-20 md:h-20" />
            <IoClose className="absolute w-5 h-5 text-red-500 md:w-10 md:h-10 left-7 top-10 md:left-12 md:top-14" />
          </div>
          <div className="relative">
            <IoRainy className="w-12 h-12 text-black md:w-20 md:h-20" />
            <IoClose className="absolute w-5 h-5 text-red-500 md:w-10 md:h-10 left-7 top-10 md:left-12 md:top-14" />
          </div>
        </div>
        <p className="text-base md:text-xl">예보 ❌ 강수 ❌</p>
      </div>
    </>
  );
};

export default IconGrid;
