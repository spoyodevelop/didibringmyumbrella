import React from "react";
import { CiPercent } from "react-icons/ci";
import { FaCloudRain } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { IoIosMegaphone } from "react-icons/io";

const HowItWorksDetail = ({ className }) => {
  // Your code here

  return (
    <section className={className}>
      <h1 className="mb-8 text-2xl font-bold text-center text-black">
        사이트는 이렇게 작동해요.
      </h1>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {/* Step 1 */}
        <div className="flex flex-col items-start justify-between w-full p-2 shadow-xl rounded-xl bg-slate-100 card">
          <div className="card-body">
            <IoIosMegaphone size={32} />
            <h1 className="mb-2 text-lg font-bold text-black card-title">
              <span className="text-4xl font-bold">1.</span> 단기예보 API에서
              강수 확률을 가져와요.
            </h1>
            <p>
              단기예보 API에서 제공하는 강수 확률을 가져와요. 이때, 강수 확률은
              10% 단위로 제공되요.
            </p>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-start justify-between w-full p-2 shadow-xl rounded-xl bg-slate-100 card">
          <div className="card-body">
            <FaCloudRain size={24} />
            <h1 className="mb-2 text-lg font-bold text-black card-title">
              <span className="text-4xl font-bold">2.</span> 초단기예보 API에서
              실제 강수 현황을 가져와요.
            </h1>
            <p>
              실제로 강수 현황을 가져와서 비가 내리는지 안내리는지 확인해요.
            </p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-start justify-between w-full p-2 shadow-xl rounded-xl bg-slate-100 card">
          <div className="card-body">
            <IoIosStats size={30} />
            <h1 className="mb-2 text-lg font-bold text-black card-title">
              <span className="text-4xl font-bold">3.</span> 1과 2를 비교해서
              실제 강수 확률을 확인해요.
            </h1>
            <p>
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
