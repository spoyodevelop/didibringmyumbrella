import React from "react";
import GraphIcon from "./icons/GraphIcon";

const AllPOPStatsIntro = ({ className }) => {
  // Your component code here
  return (
    <section className={className}>
      <div className="p-0 card-body">
        <GraphIcon className="w-12 h-12" />
        <div className="flex items-center gap-2 ">
          <h2 className="mb-1 text-3xl text-black card-title">
            강수 확률 몇 % 부터 우산을 챙기는게 좋을까요?
          </h2>
        </div>

        <p className="text-lg">
          이 그래프는 대한민국 전체 지역의 강수 확률을 분석한 그래프에요.
          전체적으로 강수 확률을 그래프로 나타냈어요. 10%단위(0%, 10%....100%)로
          나누어져 있어요. 그래프에 커서를 올리면, 조금 더 자세한 데이터를
          확인할수 있어요.
        </p>
      </div>
    </section>
  );
};

export default AllPOPStatsIntro;
