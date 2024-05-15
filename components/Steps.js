import React from "react";
import LocationIcon from "./icons/LocationIcon";
import "boxicons";
import GraphIcon from "./icons/GraphIcon";

const Steps = ({ className }) => {
  return (
    <section className={className}>
      <div className="flex items-center w-full shadow-xl card bg-slate-100">
        <div className="card-body">
          <LocationIcon className="w-12 h-12" />
          <h1 className="text-black card-title">
            <span className="text-4xl text-bold">1.</span>위치를 선택하세요.
          </h1>
          <p>
            현위치는? 버튼을 눌러서 현위치의 정보를 가져올수 있어요. 혹은
            광역시의 위치를 선택해서 해당 광역시의 정보를 가져올수 있어요.
          </p>
        </div>
      </div>
      <div className="flex items-center w-full shadow-xl card bg-slate-100">
        <div className="card-body">
          <box-icon
            name="cloud-light-rain"
            size="lg"
            color="currentColor"
          ></box-icon>
          <h1 className="text-black card-title">
            <span className="text-4xl text-bold">2.</span>강수확률을
            비교해보세요.
          </h1>
          <p>
            예보 강수확률은 기상청에서 계산한 강수확률이에요. 실제 강수확률은 총
            예보횟수에서 정말 비가 내린 횟수를 나누어 확률로 나타낸 값이에요.
          </p>
        </div>
      </div>
      <div className="flex items-center w-full shadow-xl card bg-slate-100">
        <div className="card-body">
          <GraphIcon className="w-12 h-12" />
          <h1 className="text-black card-title">
            <span className="text-4xl text-bold">3.</span>그래프로 세세한 비교를
            해보세요.
          </h1>
          <p>
            현재 강수 확률이 아닌 10% 단위로 나누어서 보여주는 그래프를 통해서
            해당 예보 강수획률에 비해 실제 강수 확률이 어떤지 비교해보세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Steps;
