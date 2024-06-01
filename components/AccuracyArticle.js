import IconGrid from "./icons/IconGrid";
import { useWeatherStore } from "@/app/store/weather-store";
import { FaExternalLinkAlt } from "react-icons/fa";

const AccuracyArticle = () => {
  const { allOfPOPDataStats } = useWeatherStore();
  return (
    <div className="">
      <header className="p-4 mb-6 text-white bg-blue-500 rounded-lg shadow-sm md:shadow-lg shadow-cyan-400/40 sm:p-6 md:p-6">
        <h1 className="text-2xl font-bold tracking-tighter md:text-5xl">
          실제 적중률은 50%이 안된다고?! 🤔
        </h1>
        <p className="mt-2">기상청의 강수 예보 정확도와 감사원의 주장</p>
      </header>
      <div className="flex flex-col p-4 rounded-lg shadow-lg md:p-8 sm:flex-row bg-stone-100">
        <div>
          <section className="mb-8 section-indicator">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-4xl">
              기상청의 주장
            </h2>
            <article className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
              <p className="leading-relaxed text-gray-700">
                지난 12일 기상청과 국회 입법조사처에 따르면, 기상청 단기예보
                강수유무정확도는{" "}
                <span className="highlight">
                  2019년 92.7%, 2020년 91.4%, 2021년 90.9%, 2022년 92.4%에
                  달한다.
                </span>
              </p>
            </article>
            <p className="mt-4 leading-relaxed text-gray-700">
              일반적으로 무려 <span className="highlight">90%</span> 넘는 확률을
              기대 할 수 있는 것이죠. 그런데 이것이 정말 맞는 것일까요?
            </p>
          </section>

          <section className="mb-8 section-indicator">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-4xl">
              감사원의 주장
            </h2>
            <article className="p-6 mb-4 bg-white border border-gray-300 rounded-lg shadow-sm">
              <p className="leading-relaxed text-gray-700">
                우선 감사원은 기상청의 강수 예보 평가 기준에 문제를
                제기했습니다. 강수 예보를 평가하는 잣대로
                <span className="highlight">&lsquo;정확도&rsquo;</span>를 쓰는
                것은 적절하지 않다는 겁니다. 같은 강수 상황을 반영했더라도,
                기상청이 발표해온 예보 &lsquo;정확도&rsquo;와 감사원이 제시한
                예보 <span className="highlight">&lsquo;적중률&rsquo;</span>은
                계산 방식에 차이가 있습니다. 강수 예보에 대한 경우의 수는
                4가지입니다.
              </p>
            </article>
            <div className="flex justify-center">
              <div className="grid items-center justify-center w-64 grid-cols-2 gap-4 md:w-96">
                <IconGrid />
              </div>
            </div>
            <div className="p-6 mt-4">
              <p className="mb-4 leading-relaxed text-gray-700">
                한편, 위 도표에서 1번과 4번은 기상청이 맞다고 할 수 있고, 2번과
                3번은 틀렸다고 할 수 있어요.
              </p>
              <ul className="pl-0 mt-4 mb-4 ml-0 text-gray-700 list-disc list-inside md:pl-4 md:ml-6">
                <li>1번: 기상청이 비를 예보했고, 실제로 비가 옴</li>
                <li>2번: 기상청이 비를 예보했지만, 비가 오지 않음</li>
                <li>3번: 기상청이 비를 예보하지 않았지만, 비가 옴</li>
                <li>
                  4번: 기상청이 비를 예보하지 않았고, 실제로 비가 오지 않음
                </li>
              </ul>

              <p className="mt-4 mb-4 leading-relaxed text-gray-700">
                1번의 경우는 제대로{" "}
                <span className="highlight">
                  기상청이 실력을 발휘해 맞춘 경우
                </span>
                이지만, 4번의 경우에는 굉장히 많은 경우 거저로 정확도를 올릴 수
                있어요. 전체 예보 {allOfPOPDataStats?.totalArrayCount}건 중 강수
                확률 0% 예보의 경우 {allOfPOPDataStats["POP0"]?.arrayLength}건에
                달하니, 절반정도는{" "}
                <span className="highlight">
                  거저로 정확도를 올릴 수 있지요.
                </span>
              </p>
            </div>

            <article className="p-6 mt-4 mb-8 bg-white border border-gray-300 rounded-lg shadow-sm">
              <p className="leading-relaxed text-gray-700 b-12">
                감사원은 바로 이 부분에 대해 문제를 제기했습니다. 여름을
                제외하면 강수량이 많지 않은 우리나라 날씨 특성상, 이런 방식으로
                계산할 경우 강수 예보 정확도가 높게 나타날 수밖에 없다는 겁니다.
                기상청 방식대로 계산하면 정확도는 92%에 달하지만 감사원 방식이면
                적중률은 46%로 뚝 떨어집니다. 열 번 중 아홉 번 이상 맞는 게
                아니라 두 번 중 한 번도 제대로 맞추지 못한 셈입니다. 감사원은
                심지어 &ldquo;기상청이 비가 온다는 예보를 1년간 전혀 하지 않아도
                강수 예보 정확도는 89.5%에 달한다&rdquo;고 꼬집었습니다. 비와
                관련 없는 맑은 날은 빼고, 실제로 비가 내렸거나 비를 예보한 날만
                따져 계산해야 한다고 지적했습니다. 실제로 미국·영국 등의
                선진국에서도 적중률을 강수 예보 기준으로 삼고 있습니다.
              </p>

              <div className="flex justify-end">
                <a
                  href="https://news.sbs.co.kr/amp/news.amp?news_id=N1004359476"
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-800 group"
                >
                  <FaExternalLinkAlt className="transition-opacity duration-300 ease-in-out transform scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:transition-transform group-hover:duration-200" />
                  출처:SBS
                </a>
              </div>
            </article>

            <p className="mt-4 mb-12 leading-relaxed text-gray-700">
              4번의 경우를 제외하면, 기상청의 예보{" "}
              <span className="highlight">&lsquo;적중률&rsquo;</span>은{" "}
              <span className="highlight"> 40%</span>대에 불과한 경우가 많아요.
            </p>
            <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800 md:text-4xl">
              그럼, 왜 기상청은 이렇게 날씨를 맞추기 어려워 하는 것일까요?
            </h2>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccuracyArticle;
