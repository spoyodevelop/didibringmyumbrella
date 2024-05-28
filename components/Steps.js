import React from "react";
import LocationIcon from "./icons/LocationIcon";
import GraphIcon from "./icons/GraphIcon";
import { FaCloudRain } from "react-icons/fa";

const Steps = ({ className }) => {
  return (
    <section className={`${className} py-12`}>
      <h1 className="mb-12 text-3xl font-bold text-center text-gray-800">
        사용방법은 간단합니다.
      </h1>
      <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-3">
        {/* Step 1 */}
        <div className="flex flex-col items-center justify-between w-full p-6 transition duration-500 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <div className="flex flex-col items-center card-body">
            <LocationIcon className="w-16 h-16 mb-4 text-blue-500" />
            <h1 className="mb-4 text-xl font-bold text-center text-gray-800 card-title">
              <span className="text-3xl font-extrabold text-blue-500">1.</span>{" "}
              위치를 선택하세요.
            </h1>
            <p className="text-center text-gray-600">
              현위치는? 버튼을 눌러서 현위치의 정보를 가져올수 있어요. 혹은
              광역시의 위치를 선택해서 해당 광역시의 정보를 가져올수 있어요.
            </p>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center justify-between w-full p-6 transition duration-500 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <div className="flex flex-col items-center card-body">
            <FaCloudRain className="w-16 h-16 mb-4 text-blue-500" />
            <h1 className="mb-4 text-xl font-bold text-center text-gray-800 card-title">
              <span className="text-3xl font-extrabold text-blue-500">2.</span>{" "}
              강수확률을 비교해보세요.
            </h1>
            <p className="text-center text-gray-600">
              기상청에서 제공하는 강수확률을 확인하고, 실제 강수 확률과
              비교해보세요.
            </p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center justify-between w-full p-6 transition duration-500 transform bg-white shadow-lg rounded-xl hover:scale-105">
          <div className="flex flex-col items-center card-body">
            <GraphIcon className="w-16 h-16 mb-4 text-blue-500" />
            <h1 className="mb-4 text-xl font-bold text-center text-gray-800 card-title">
              <span className="text-3xl font-extrabold text-blue-500">3.</span>{" "}
              그래프로 비교를 해보세요.
            </h1>
            <p className="text-center text-gray-600">
              현재 강수 확률이 아닌 10% 단위로 나누어서 보여주는 그래프를 통해서
              해당 예보 강수확률에 비해 실제 강수 확률이 어떤지 비교해보세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
