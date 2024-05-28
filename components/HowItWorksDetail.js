import React from "react";
import { FaCloudRain } from "react-icons/fa";
import { IoIosStats, IoIosMegaphone } from "react-icons/io";

const HowItWorksDetail = ({ className }) => {
  return (
    <section className={`${className} py-12`}>
      <h1 className="mb-12 text-3xl font-bold text-center text-gray-800">
        사이트는 이렇게 작동해요.
      </h1>
      <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-3">
        {/* Step 1 */}
        <div className="flex flex-col items-center justify-between w-full p-6 transition duration-500 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <div className="flex flex-col items-center card-body">
            <IoIosMegaphone size={48} className="mb-4 text-blue-500" />
            <h1 className="mb-4 text-xl font-bold text-center text-gray-800">
              <span className="text-3xl font-extrabold text-blue-500">1.</span>{" "}
              단기예보 API에서 강수 확률을 가져와요.
            </h1>
            <p className="text-center text-gray-600">
              단기예보 API에서 제공하는 강수 확률을 가져와요. 이때, 강수 확률은
              10% 단위로 제공되요.
            </p>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center justify-between w-full p-6 transition duration-500 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <div className="flex flex-col items-center card-body">
            <FaCloudRain size={48} className="mb-4 text-blue-500" />
            <h1 className="mb-4 text-xl font-bold text-center text-gray-800">
              <span className="text-3xl font-extrabold text-blue-500">2.</span>{" "}
              초단기예보 API에서 실제 강수 현황을 가져와요.
            </h1>
            <p className="text-center text-gray-600">
              실제로 강수 현황을 가져와서 비가 내리는지 안내리는지 확인해요.
            </p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center justify-between w-full p-6 transition duration-500 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <div className="flex flex-col items-center card-body">
            <IoIosStats size={48} className="mb-4 text-blue-500" />
            <h1 className="mb-4 text-xl font-bold text-center text-gray-800">
              <span className="text-3xl font-extrabold text-blue-500">3.</span>{" "}
              1과 2를 비교해서 실제 강수 확률을 확인해요.
            </h1>
            <p className="text-center text-gray-600">
              10% 단위로 제공되는 강수 확률과 실제 강수 현황을 비교해서 DB에
              저장해요. 그리고 이 현황을 그래프등으로 보여주고 있어요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksDetail;
