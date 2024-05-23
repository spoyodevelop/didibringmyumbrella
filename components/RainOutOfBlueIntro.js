import React from "react";

const RainOutOfBlueIntro = ({ className, data }) => {
  const now = new Date();
  const startDate = new Date(2024, 3, 21);
  const diffInMilliseconds = now - startDate;

  // 밀리초를 일수로 변환합니다.
  const daysPassed = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return (
    <section className={className}>
      <div className="p-0 card-body">
        <div className="flex items-center gap-2 ">
          <h2 className="mb-1 text-3xl text-black card-title">
            분명 비가 안온다 했는데...?
          </h2>
        </div>

        <p className="text-xl">
          0% 강수 확률이었는데 갑자기 비가 오는 경우가 있지요. 2024년 4월
          21일부터{" "}
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          까지 총 {daysPassed}일동안 데이터를 긁어 모아 봤어요. 0% 강수 확률이
          예보되었지만 실제 강수가 관측된 경우는 총{data?.length}번이 있었어요.
          밑에서는 지역별로 강수가 관측된 경우를 확인할수 있어요.
        </p>
      </div>
    </section>
  );
};

export default RainOutOfBlueIntro;
