import React from "react";
import Image from "next/image";

const Infographic = ({ className }) => {
  // Your component logic here

  return (
    <section className={className}>
      <h1>강수 확률, 그것이 알고 싶다.</h1>
      <h1>그렇게 맞추는게 어려운가?</h1>
      <Image
        src="/images/infographic.png"
        alt="Infographic"
        width={800}
        height={800}
        className="shadow-xl rounded-xl"
      />
      <p>
        우선 감사원은 기상청의 강수 예보 평가 기준에 문제를 제기했습니다. 강수
        예보를 평가하는 잣대로 정확도를 쓰는 것은 적절하지 않다는 겁니다. 같은
        강수 상황을 반영했더라도, 기상청이 발표해온 예보 정확도와 감사원이
        제시한 예보 적중률은 계산 방식에 차이가 있습니다. 강수 예보에 대한
        경우의 수는 4가지입니다.
      </p>
    </section>
  );
};

export default Infographic;
