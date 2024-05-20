import { IoIosMegaphone } from "react-icons/io";
import { IoRainy } from "react-icons/io5";
const WeatherData = ({ data, typeOfData, className }) => {
  function convertToDateTime(fcstDate, fcstTime) {
    // 날짜와 시간을 분리
    const year = String(fcstDate).substring(0, 4);
    const month = String(fcstDate).substring(4, 6) - 1; // JavaScript의 월은 0부터 시작하므로 1을 빼줍니다.
    const day = String(fcstDate).substring(6, 8);
    let hours;
    if (String(fcstTime).length === 3) {
      hours = String(fcstTime).substring(0, 1);
    } else {
      hours = String(fcstTime).substring(0, 2);
    }
    // Date 객체 생성
    const dateObject = new Date(year, month, day, hours);

    return dateObject;
  }
  if (!data)
    return (
      <div className={className}>
        <div className="card-body">
          <h2 className="text-xl text-black lg:text-sm xl:text-xl card-title">
            데이터를 가져오는데 실패했습니다.
          </h2>
          <p>조금 후에 다시 시도해주세요.</p>
        </div>
      </div>
    );
  let formattedString;
  let formattedDate;
  let icon;
  if (typeOfData === "POP") {
    const { POP } = data;
    icon = <IoIosMegaphone size={32} />;
    if (!POP) return;
    formattedDate = convertToDateTime(POP.POP.fcstDate, POP.POP.fcstTime);
    const formattedValue = POP.POP.fcstValue;
    const name = "예보강수확률 ";
    const formatter = "%";
    formattedString = { name, formatter, formattedValue };
  }
  if (typeOfData === "RN1") {
    const { RN1 } = data;
    icon = <IoRainy size={28} />;
    if (!RN1) return;

    formattedDate = convertToDateTime(RN1.RN1.baseDate, RN1.RN1.baseTime);
    const formattedValue = RN1.RN1.obsrValue;

    const name = "강수량은";
    const formatter = "mm";
    formattedString = { name, formattedValue, formatter };
  }
  return (
    <div className={className}>
      <div className="stat">
        <div> {icon}</div>
        <div className="stat-title">{formattedString?.name}</div>
        <div className="stat-value">{formattedString?.formattedValue}</div>
        <div className="stat-desc">{formattedString?.formatter}</div>
      </div>
      <div className="stat">
        <div className=" stat-title">기준 날짜</div>
        <div className="text-sm text-slate-400 stat-value">
          {formattedDate?.toLocaleDateString("ko-KR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
