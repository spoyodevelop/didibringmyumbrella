import IconGrid from "./icons/IconGrid";
import { useWeatherStore } from "@/app/store/weather-store";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import WeatherForecastPieChart from "./WeatherForecastPieChart";

const WhyArticle = () => {
  const { allOfPOPDataStats } = useWeatherStore();
  const weatherData = [
    { id: "슈퍼컴퓨터", value: 40, color: "#ff0000" },
    { id: "기상관측", value: 32, color: "#00ff00" },
    { id: "예보관 주관", value: 28, color: "#0000ff" },
  ];

  return (
    <div className="">
      <header className="p-4 mb-6 text-white bg-blue-500 rounded-lg shadow-sm md:shadow-lg shadow-cyan-400/40 sm:p-6 md:p-6">
        <h1 className="text-2xl font-bold tracking-tighter md:text-5xl">
          날씨 예측은 끔찍하게 어렵다고? 🤔
        </h1>
        <p className="mt-2">왜 날씨 맞추기가 어려운지 알아보아요.</p>
      </header>
      <div className="flex flex-col p-4 rounded-lg shadow-lg md:p-8 sm:flex-row bg-stone-100">
        <div>
          <section className="mb-8 section-indicator">
            <h2 className="mb-12 text-2xl font-semibold text-gray-800 md:text-4xl">
              &lsquo;1초에 5경2천조번 연산&rsquo;
            </h2>
            <div className="flex justify-center mb-12">
              <div className="relative w-full xl:w-3/5 h-96">
                <Image
                  loading="lazy"
                  src="/images/server.jpeg"
                  alt="image of server"
                  layout="fill" // Keeps the image responsive
                  className="rounded-lg shadow-lg" // Removed mb-12 to avoid unnecessary margin
                />
              </div>
            </div>

            <article className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
              <p className="leading-relaxed text-gray-700">
                국가기상슈퍼컴퓨터센터는 20년간 5번에 걸쳐 슈퍼컴퓨터를 교체하며
                25만 배의 성능 향상을 이뤘다. 성능의 발전에 따라 지원하는 기능을
                추가하며 국민 편의성도 향상시켰다. 1호기는 객관적 기상예보 체계
                구축했으며, 2005년 도입된 2호기는 스마트폰과 네비게이션 출시에
                맞춰 5km 범위의 초단기 수치예보모델을 적용한 동네예보를
                추가했다. 이를 통해 지역별 날씨 예보지원이 시작됐다. 동네예보
                도입 초기 6시간마다 이뤄지던 일기예보 갱신 시간도 3시간,
                1시간으로 점차 단축됐다. 3호기는 전지구모델 해상도를 기존
                55Km에서 25Km로 줄이며 수치 예측 값의 정확도를 높였으며, 4호기는
                폭염, 폭설, 한파 등 규모가 작고 수명이 짧아 정확한 예보가 어려운
                위험기상 관련 데이터도 분석할 수 있게 됐다.
                <a
                  href="https://news.sbs.co.kr/amp/news.amp?news_id=N1004359476"
                  className="flex items-center justify-end gap-2 text-blue-500 hover:text-blue-800"
                >
                  <FaExternalLinkAlt />
                  출처:SBS
                </a>
              </p>
            </article>
            <p className="mt-4 leading-relaxed text-gray-700">
              그렇게 계속해서 기상청의 슈퍼 컴퓨터가 업그레이드 되었고, 계속해서
              기상 분석과 관측이 개선되고 있는중이에요. 그리고 지금 현재는
              5호기가 운영중이에요. 5호기는 1초에 5경2천조번의 연산을 할 수
              있고, 4호기에 비해 92배나 빨라졌어요. 하지만 아직도 날씨 적중률은
              50%를 넘지못해요. 왜 그럴까요?
            </p>
          </section>

          <section className="mb-8 section-indicator">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-4xl">
              우리나라가 유독 날씨 예측이 어려운 이유
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              일단,{" "}
              <a
                href="https://www.hankookilbo.com/News/Read/A2020072214140001639"
                className="font-semibold text-blue-500 hover:text-blue-700 hover:underline"
              >
                한국일보에서 기상청 기술서기관과 인터뷰한 기사
              </a>
              를 하나 볼께요.
            </p>
            <div className="flex justify-center mb-12">
              <div className="relative w-full xl:w-3/5 h-96">
                <Image
                  loading="lazy"
                  src="/images/weatherkorea.jpg"
                  alt="image of weather in korea"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg" // Removed mb-12 to avoid unnecessary margin
                />
              </div>
            </div>

            <article className="p-6 mb-4 bg-white border border-gray-300 rounded-lg shadow-sm">
              <p className="leading-relaxed text-gray-700">
                윤 서기관은 &ldquo;한국 지형적 특성 상 남북으로 길게 돼 있고,
                고도 높낮이가 지역별로 많이 다르기 때문에 이런 지형적 특성도
                기상 예측을 어렵게 하는 요인&rdquo;이라고 설명했다.
              </p>
            </article>

            <div className="p-6 mt-4">
              <p className="mb-4 leading-relaxed text-gray-700">
                기상청이 비를 예측하려면 단순히 기온과 습도만 보는 게 아닌데요.
                바람이 얼마나 세게 위에서 아래로 부는지 혹은 동쪽에서 서쪽으로
                부는지 등 챙겨야 할 게 정말 많다고 봐야 하고요. 여기에 태양열과
                지면 에너지, 지역적 특성(도시인지 산골인지), 지형 고도까지
                시시각각 반영해야 한다고 해요.
              </p>

              <p className="mt-4 mb-4 leading-relaxed text-gray-700">
                또 일단 비가 오고 나서의 상황도 변수가 되는데요. 비가 남기고 간
                흔적 예컨대 습도나 기온 등이 그 바로 뒤의 날씨에 직접적 영향을
                끼치기 때문에 장기 예보보다는 실시간 예보가 더 정확하겠죠.
                게다가 측정하는 장소도 하나의 변수가 되는데요. 실제로 우리 동네
                날씨를 보더라도 우리 집이 아니라 &lsquo;관측소가 설치된
                곳&rsquo;이다 보니 실제 우리 집 앞 날씨와는 조금 다를 수도
                있다는 설명입니다.
              </p>
            </div>

            <article className="p-6 mb-8 bg-white border border-gray-300 rounded-lg shadow-sm">
              <p className="leading-relaxed text-gray-700">
                윤 서기관은 &ldquo;비 예보는 작은 오차가 정확도를 가르기
                마련인데, 관측소부터 어떻게 보면 오차일 수 있기 때문에 실제
                시민들이 체감하는 정확도 및 맞힘률이 낮을 수밖에 없다&rdquo;고
                말했다.
              </p>
            </article>
          </section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-4xl">
            예보관의 주관과 항상 노력하는 기상청
          </h2>
          <div className="w-3/4 h-96">
            <WeatherForecastPieChart data={weatherData} />
          </div>
          <article className="p-6 mb-8 bg-white border border-gray-300 rounded-lg shadow-sm">
            <p className="leading-relaxed text-gray-700">
              기상청에 따르면 날씨 예보의 단계별 역할 비중이 슈퍼컴퓨터의 예보
              40%, 관측 자료 32%, 마지막 예보관의 판단이 28% 정도 차지한다고
              합니다. 예보관은 모든 관측 자료와 결과값을 토대로 종합적인 판단을
              내려 매일 날씨를 예측하죠.
              <a
                href="https://www.sedaily.com/NewsView/1VLUEDR8RO"
                className="flex items-center justify-end gap-2 text-blue-500 hover:text-blue-800"
              >
                <FaExternalLinkAlt />
                출처:서울경제
              </a>
            </p>
          </article>
          <p className="mt-4 mb-4 leading-relaxed text-gray-700">
            예보관이 정확한 판단을 하려면 무엇보다 날씨에 대한 충분한 지식과
            경험이 있어야 하는데요. 최근 지구 온난화로 기상이변이 잦아지면서
            관측 자료가 부족하거나 오차가 높은 경우가 많은데 제대로 된 판단을
            하기 위해 예보관의 역량이 더 중요해지는 시점이죠. 하지만 현실은
            상당히 여려워요. 예보관 교육을 강화해 전문예보관을 육성해도 모자랄
            판에 한국의 예보관들은 12시간 반복 교대근무와 잦은 순환보직 시스템
            탓에 전문성을 갖추기가 어려운 상황이라고 이야기 합니다.
          </p>
          <p className="mt-4 mb-4 leading-relaxed text-gray-700"></p>
        </div>
      </div>
    </div>
  );
};

export default WhyArticle;
