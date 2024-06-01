import Image from "next/image";
import Typewriter from "typewriter-effect";

export default function WhyItMade({ className }) {
  return (
    <section className={`${className}`}>
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
        <div className="flex-1 p-6 transition duration-500 transform shadow-xl bg-slate-200 rounded-xl hover:scale-105">
          <section className="flex flex-col p-2 md:p-8">
            <div className="flex items-center gap-4 mb-8">
              <h1 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                아 맞다 우산!
              </h1>
            </div>
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-black lg:text-xl">
                기상청이 강수예보를 너무 맞추지 못해서 화가 났어요.
              </h2>
              <p className="text-gray-700">
                비를 자주 맞았지요. 그래서 기상청의 비 예보가 부정확한지에
                대해서 사이트를 만드려고 했어요.
              </p>
            </div>
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-black lg:text-xl">
                하지만, 기상청은 생각외로 날씨를 잘 맞추는 편이에요.
              </h2>
              <p className="text-gray-700">
                초단기예보가 나온 이후로는, 꽤나 그 정확도가 높다는 것이
                확인되었어요. 그래서 방향타를 틀었어요.
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
                <h2 className="text-xl font-semibold text-center text-black lg:text-2xl">
                  그래서 강수 확률을 조금더 유용하게 만들어 봤어요.
                </h2>
              </div>
            </div>
          </section>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="flex items-center justify-center h-4 w-80 mt-8 mb-4 text-base font-bold text-white transition duration-500 transform sm:mt-0 lg:text-3xl hover:scale-105 lg:w-[40rem] lg:h-auto">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("이 사이트는 왜 만들어져 있는건가요?")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("사이트를 만들게 된 이유를 알려줄께요.")
                  .callFunction(() => {
                    typewriter.stop(); // Stop the typewriter instance
                  })
                  .start();
              }}
              style={{ color: "red", fontSize: "20px" }}
            />
          </div>

          <Image
            src="/images/questioning.svg"
            alt="questioning face"
            width={250}
            height={250}
            className="transition duration-500 transform rounded-full shadow-lg hover:scale-105"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
