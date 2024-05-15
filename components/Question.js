import React from "react";
import Image from "next/image";

import FrownFace from "./icons/FrownFace";

const Question = ({ className }) => {
  return (
    <section className={className}>
      <div className="flex flex-col items-center justify-center align-item">
        <h1 className="mb-4 text-2xl lg:text-3xl">
          오늘 분명 비가 온다고 했는데...
        </h1>

        <Image
          src="/images/confused.svg"
          alt="confused face"
          width={250}
          height={250}
        />
      </div>
      <div className="w-full shadow-xl md:w-1/2 bg-slate-200 rounded-xl">
        <section className="flex flex-col p-8">
          <div className="flex items-center gap-4 mb-8">
            <FrownFace className="w-12 h-12" />
            <h1 className="text-xl lg:text-2xl">이런적 한번쯤 있으시죠?</h1>
          </div>
          <div className="mb-4">
            <h2 className="mb-1 text-base font-semibold text-black lg:text-lg">
              30%의 확률로 비가 내린다고 해요.
            </h2>
            <p>
              날씨 예보에서 강수확률 30%를 확인했을때, 밖에 우산을 가지고
              나가셨나요? 가지지 않고 나가셨나요? 그리고 밖에 비가 왔나요?
            </p>
          </div>
          <div className="mb-4">
            <h2 className="mb-1 text-base font-semibold text-black lg:text-lg">
              60%의 확률로 비가 내린다고 해요.
            </h2>
            <p>
              60%의 확률로 강수가 된다면, 우산을 들고 가는게 좋겠죠? 하지만 항상
              밖에 비가 왔나요? 항상 그렇진 않죠?
            </p>
          </div>
          <div className="self-center card">
            <div className="flex justify-center card-body">
              <h2 className="text-xl font-semibold text-center text-black lg:text-3xl">
                강수 확률은 어떻게 나오는거야?
              </h2>
              <p className="text-xl text-center">강수 확률을 믿으시나요?</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
export default Question;
