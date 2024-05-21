import React from "react";
import { IoIosUmbrella } from "react-icons/io";

const SquallMeterIntro = ({ className }) => {
  // Your component code here
  return (
    <section className={className}>
      <div className="p-0 card-body">
        <IoIosUmbrella className="w-10 h-10" />
        <div className="flex items-center gap-2 ">
          <h2 className="mb-1 text-3xl text-black card-title">
            앗 갑자기 비가 온다!
          </h2>
        </div>

        <p className="text-xl">
          갑작스레 비가 내리는 경우가 있지요. 스콜미터는 이런 갑작스러운
          소나기에 대한 확률이에요. 소나기가 오는 확률에 가중 편차 평균을
          적용하여 소나기가 오는 확률을 계산해요. 가중 평균이 높을수록 소나기가
          오는 것이 더 심하다는 뜻이에요.
        </p>
      </div>
    </section>
  );
};

export default SquallMeterIntro;
