import React from "react";
import { useWeatherStore } from "@/app/store/weather-store";

const Accordion = ({ activeAccordion, setActiveAccordion, className }) => {
  const { weatherData } = useWeatherStore();
  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className={className}>
      <h1 className="p-4 text-3xl font-bold lg:text-5xl">Q&A</h1>
      <div className="collapse collapse-arrow">
        <input
          type="radio"
          name="my-accordion-2"
          id="accordion-1"
          checked={activeAccordion === "accordion-1"}
          onChange={() => toggleAccordion("accordion-1")}
        />
        <label
          htmlFor="accordion-1"
          className="text-xl font-bold text-black collapse-title"
        >
          {weatherData?.didItRain || weatherData?.RN1?.RN1?.obsrValue > 0
            ? "어? 밖에는 비가 오지 않는데?"
            : "어? 밖에는 비가 오는데?"}
        </label>
        <hr className="h-px border-0 bg-slate-300" />
        <div className=" collapse-content">
          <p className="text-slate-400">
            본 사이트는 기상청에서 제공하는 초단기예보 API를 이용하여
            제작되었어요. 초단기예보는{" "}
            <span className="highlight">1시간 단위</span>로 갱신되요. 새로 고침
            버튼을 눌러도 날씨가 안바뀐다면, 아직 서버에 날씨 현황이 업데이트
            되지 않아 예보가 틀릴수 있어요. 조금 더 정확한 정보를 원하신다면,
            기상청의{" "}
            <a
            target="_blank"
              href="https://www.weather.go.kr"
              className="inline-flex items-center gap-2 font-bold text-blue-500 hover:text-blue-800 group"
            >
              공식 사이트
            </a>
            를 참고해주세요.
          </p>
        </div>
      </div>

      <div className="text-black collapse collapse-arrow">
        <input
          type="radio"
          name="my-accordion-2"
          id="accordion-2"
          checked={activeAccordion === "accordion-2"}
          onChange={() => toggleAccordion("accordion-2")}
        />
        <label
          htmlFor="accordion-2"
          className="text-xl font-bold collapse-title"
        >
          위치 정보는 왜 필요해요?
        </label>
        <hr className="h-px border-0 bg-slate-300" />
        <div className="collapse-content">
          <p className="text-slate-400">
            위치를 입력하면, 해당 위치의 날씨 정보를 가져올 수 있어요. 위치
            정보는 브라우저에서 제공하는 기능(
            <a
            target="_blank"
              href="https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API"
              className="inline-flex items-center gap-2 font-bold text-blue-500 hover:text-blue-800 group"
            >
              Geolocation API
            </a>
            )을 이용하여 가져오며, 서버등 어디에도 저장되지 않습니다. 안심하고
            사용하셔도 됩니다. 그래도 위치정보를 입력하기 싫으시다면, 각
            광역시의 날씨 정보를 보실 수 있어요.
          </p>
        </div>
      </div>
      <div className="text-black collapse collapse-arrow">
        <input
          type="radio"
          name="my-accordion-2"
          id="accordion-3"
          checked={activeAccordion === "accordion-3"}
          onChange={() => toggleAccordion("accordion-3")}
        />
        <label
          htmlFor="accordion-3"
          className="text-xl font-bold collapse-title"
        >
          예보 강수 확률를 여기서 제공하는 실제 강수 확률로 대체해서 사용할 수
          있나요?
        </label>
        <div className="collapse-content">
          <p className="text-slate-400">
            간단히 말하면, 안됩니다. 통계는 통계일뿐, 실제 자료를 바탕으로 하는
            날씨예보와는 차이가 많고, 한계점도 많습니다. 하지만 유용한 참고
            자료가 될 수 있어요. 항상 기상청의 예보와 비교하며, 참고용으로
            사용하는게 바람직합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
