import { useWeatherStore } from "@/app/store/weather-store";
export default function Footer({ className }) {
  const { allOfPOPDataStats } = useWeatherStore();
  return (
    <footer className="p-10 footer bg-base-200 text-base-content">
      <aside>
        <p>
          아 맞다 우산! 프로젝트는 Spoy가 만든 조그마한 토이 프로젝트입니다.
          <br />
          기사의 저작권은 각 기사의 저작권자에게 있습니다. 교육, 인용 목적으로만
          사용되었음을 알려드립니다.
          <br />
          위의 내용들은 절대 예보목적으로 사용되어서는 안되며, 기상청에서
          제공하는 공식적인 예보에 추가적인 참고자료로만 쓰시기 바랍니다.
          <br />
          <br />
          emoji icons provided by mono_font with CC Attribution License
          <br />
          <br /> Made with DaisyUI and Heroicons, ReactIcons, Nivo.
          <br /> little help with mongoDB in the backend.
          <br />
          <br /> SPOY &copy; 2024
          <br />
          <br />
          마지막 데이터베이스 업데이트:{" "}
          {new Date(allOfPOPDataStats?.lastUpdatedSince)?.toLocaleString(
            "ko-KR",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }
          )}
        </p>
      </aside>
    </footer>
  );
}
