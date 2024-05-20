import React from "react";
import { IoIosUmbrella } from "react-icons/io";

const AllPOPStatsIntro = ({ className }) => {
  // Your component code here
  return (
    <section className={className}>
      <div className="p-0 card-body">
        <IoIosUmbrella className="w-10 h-10" />
        <div className="flex items-center gap-2 ">
          <h2 className="mb-1 text-3xl text-black card-title">
            강수 확률 몇 % 부터 우산을 챙기는게 좋을까요?
          </h2>
        </div>

        <p className="text-xl">
          이 그래프는 대한민국 전체 지역의 강수 현황을 강수 확률 별로 나누어
          분석한 그래프에요. 10% 단위로 구분되는 강수 확률 별로 실제로 얼마나
          많이 예보가 됬는지, 실제로 비가 내린 횟수는 얼마나 됬는지 알아볼 수
          있어요.
        </p>
      </div>
    </section>
  );
};

export default AllPOPStatsIntro;
