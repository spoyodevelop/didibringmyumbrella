import Image from "next/image";
import Typewriter from "typewriter-effect";
import { useEffect, useState, useRef } from "react";

export default function WhyItMade({ className }) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Adjust the threshold and rootMargin as needed
        const isVisible = entry.isIntersecting;
        setIsVisible(isVisible);
      },
      {
        threshold: 0.1, // Adjust this value to control when the callback triggers
        rootMargin: "-50% -50% 0px 0px", // Adjust margin to control the area around the element
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
    <section ref={componentRef} className={`${className}`} id="만든이유">
      <div className="flex flex-col-reverse items-center gap-8 lg:flex-row">
        <div className="flex flex-col items-center justify-center flex-1">
          {isVisible && (
            <div className="flex items-center justify-center mt-8 mb-4 text-base font-bold text-white transition duration-500 transform sm:mt-0 lg:text-3xl hover:scale-105">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("강수 확률이 30%일때, 우산을 두고 나갔나요?")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("강수 확률이 60%일때, 우산을 들고 나갔나요?")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("확실하게 비가 올때만 강수를 체크해보세요.")
                    .callFunction(() => {
                      typewriter.stop(); // Stop the typewriter instance
                    })
                    .start();
                }}
                style={{ color: "red", fontSize: "20px" }}
              />
            </div>
          )}

          <Image
            src="/images/questioning.svg"
            alt="questioning face"
            width={250}
            height={250}
            className="transition duration-500 transform rounded-full shadow-lg hover:scale-105"
          />
        </div>
        <div className="flex-1 p-6 transition duration-500 transform shadow-xl bg-slate-200 rounded-xl hover:scale-105">
          <section className="flex flex-col p-2 md:p-8">
            <div className="flex items-center gap-4 mb-8">
              <h1 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                이런적 한번쯤 있으시죠?
              </h1>
            </div>
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-black lg:text-xl">
                강수 확률이 30%라는 기상예보를 봤을때, 우산을 두고 나갔나요?
              </h2>
              <p className="text-gray-700">
                날씨 예보에서 강수확률 30%를 확인했을때, 밖에 우산을 가지고
                나가셨나요? 가지지 않고 나가셨나요? 그리고 밖에 비가 왔나요?
              </p>
            </div>
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-black lg:text-xl">
                강수 확률이 60%라는 기상예보를 봤을때, 우산을 들고 나갔나요?
              </h2>
              <p className="text-gray-700">
                60%의 확률로 강수가 된다면, 우산을 들고 가는게 좋겠죠? 하지만
                항상 밖에 비가 왔나요? 항상 그렇진 않죠?
              </p>
            </div>
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-black lg:text-xl">
                하지만 항상 기상청이 주는 데이터가 유용하지는 않았어요.
              </h2>
              <p className="text-gray-700">
                강수 확률을 살펴보니, 0%, 30%, 60% 이런 식으로 제공이 되는데....
                이것이 쓸모는 있지만, 완벽히 유용하지는 않았어요. 그래서 정말로
                비가 오는 날에만 강수를 체크하면 어떨까? 하는 생각이 들었어요.
              </p>
            </div>
            <div className="self-center mt-4 card">
              <div className="flex justify-center p-4 transition duration-500 transform bg-blue-300 rounded-lg card-body ">
                <h2 className="text-xl font-semibold text-center text-black lg:text-3xl">
                  실제 비가 오는날에만 강수를 체크 했어요.
                </h2>
                <p className="text-xl text-center text-black">
                  실제 강수 확률을 확인해보세요.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
