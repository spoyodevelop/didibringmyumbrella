import Image from "next/image";
export default function WhyItMade({ className }) {
  return (
    <section className={className}>
      <div className="w-full shadow-xl md:w-1/2 bg-slate-200 rounded-xl">
        <section className="flex flex-col p-8">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-xl lg:text-2xl">아 맞다 우산!</h1>
          </div>
          <div className="mb-4">
            <h2 className="mb-1 text-base font-semibold text-black lg:text-lg">
              기상청이 강수예보를 너무 맞추지 못해서 화가 났어요.
            </h2>
            <p>
              비를 자주 맞았지요. 그래서 기상청의 비 예보가 부정확한지에 대해서
              사이트를 만드려고 했어요.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="mb-1 text-base font-semibold text-black lg:text-lg">
              하지만, 기상청은 생각외로 날씨를 잘 맞추는 편이에요.
            </h2>
            <p>
              초단기예보가 나온 이후로는, 꽤나 그 정확도가 높다는 것이
              확인되었어요. 그래서 방향타를 틀었어요.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="mb-1 text-base font-semibold text-black lg:text-lg">
              하지만 항상 기상청이 주는 데이터가 유용하지는 않았어요.
            </h2>
            <p>
              강수 확률을 살펴보니, 0%, 30%, 60% 이런 식으로 제공이 되는데....
              이것이 쓸모는 있지만, 완벽히 유용하지는 않았어요. 그래서 정말로
              비가 오는 날에만 강수를 체크하면 어떨까? 하는 생각이 들었어요.
            </p>
          </div>
          <div className="self-center card">
            <div className="flex justify-center card-body">
              <h2 className="text-xl font-semibold text-center text-black lg:text-3xl">
                그래서 강수 확률을 조금더 유용하게 만들어 봤어요.
              </h2>
            </div>
          </div>
        </section>
      </div>
      <div className="flex flex-col items-center justify-center align-item">
        <h1 className="mb-4 text-2xl lg:text-3xl">
          사이트를 만들게 된 이유는 뭔가요?
        </h1>

        <Image
          src="/images/questioning.svg"
          alt="questioning face"
          width={250}
          height={250}
        />
      </div>
    </section>
  );
}
