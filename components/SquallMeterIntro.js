import React from "react";
import { IoThunderstorm } from "react-icons/io5";

const SquallMeterIntro = ({ className }) => {
  // Your component code here
  return (
    <section
      className={`${className} md:p-8 p-0 bg-gradient-to-r from-blue-50 to-blue-100 `}
    >
      <IoThunderstorm className="self-center w-16 h-16 mb-4 text-blue-500 md:self-start md:mb-0 md:mr-4" />
      <div className="flex flex-col items-center md:items-start">
        <h2 className="mb-2 text-3xl font-bold text-center text-blue-700 md:text-left">
          앗 갑자기 비가 온다!
        </h2>

        <p className="text-xl text-center text-gray-700 md:text-left">
          갑작스레 비가 내리는 경우가 있지요. 소나기미터는 이런 갑작스러운
          소나기에 대한 확률이에요. 소나기가 오는 확률에 가중 편차 평균을
          적용하여 소나기가 오는 확률을 계산해요. 가중 평균이 높을수록 소나기가
          오는 것이 더 심하다는 뜻이에요.
        </p>
      </div>
    </section>
  );
};

export default SquallMeterIntro;
