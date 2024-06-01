import React from "react";
import { IoIosUmbrella } from "react-icons/io";

const AllPOPStatsIntro = ({ className }) => {
  return (
    <section
      className={`${className} md:p-8 p-0 bg-gradient-to-r from-blue-50 to-blue-100 `}
    >
      <IoIosUmbrella className="self-center w-16 h-16 mb-4 text-blue-500 md:self-start md:mb-0 md:mr-4" />
      <div className="flex flex-col items-center md:items-start">
        <h2 className="mb-2 text-3xl font-bold text-center text-blue-700 md:text-left">
          강수 확률 몇 % 부터 우산을 챙기는게 좋을까요?
        </h2>
        <p className="text-xl text-center text-gray-700 md:text-left">
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
