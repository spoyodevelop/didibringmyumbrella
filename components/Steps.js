import React from "react";
import LocationIcon from "./icons/LocationIcon";

import GraphIcon from "./icons/GraphIcon";
import Rain from "./icons/Rain";

const Steps = ({ className }) => {
  return (
    <section className={className}>
      <h1 className="mb-8 text-2xl font-bold text-center text-black">
        사용방법은 간단합니다.
      </h1>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {/* Step 1 */}
        <div className="flex flex-col items-start justify-between w-full p-2 shadow-xl rounded-xl bg-slate-100 card">
          <div className="card-body">
            <LocationIcon className="w-12 h-12" />
            <h1 className="mb-2 text-xl font-bold text-black card-title">
              <span className="text-4xl font-bold">1.</span> 위치를 선택하세요.
            </h1>
            <p>
              현위치는? 버튼을 눌러서 현위치의 정보를 가져올수 있어요. 혹은
              광역시의 위치를 선택해서 해당 광역시의 정보를 가져올수 있어요.
            </p>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-start justify-between w-full p-2 shadow-xl rounded-xl bg-slate-100 card">
          <div className="card-body">
            <Rain className="w-12 h-12" />
            <h1 className="mb-2 text-xl font-bold text-black card-title">
              <span className="text-4xl font-bold">2.</span> 강수확률을
              비교해보세요.
            </h1>
            <p>
              기상청에서 제공하는 강수확률을 확인하고, 실제 강수 확률과
              비교해보세요.
            </p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-start justify-between w-full p-2 shadow-xl rounded-xl bg-slate-100 card">
          <div className="card-body">
            <GraphIcon className="w-12 h-12" />
            <h1 className="mb-2 text-xl font-bold text-black card-title">
              <span className="text-4xl font-bold">3.</span> 그래프로 비교를
              해보세요.
            </h1>
            <p>
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
