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

  let formattedString;
  let formattedDate;
  if (typeOfData === "POP") {
    const { POP } = data;

    if (!POP) return;
    formattedDate = convertToDateTime(POP.POP.fcstDate, POP.POP.fcstTime);
    const formattedValue = POP.POP.fcstValue;
    const name = "예보강수확률 ";
    const formatter = "%";
    formattedString = { name, formatter, formattedValue };
  }
  if (typeOfData === "RN1") {
    const { RN1 } = data;
    if (!RN1) return;

    formattedDate = convertToDateTime(RN1.RN1.baseDate, RN1.RN1.baseTime);
    const formattedValue = RN1.RN1.obsrValue;

    const name = "강수량은";
    const formatter = "mm";
    formattedString = { name, formattedValue, formatter };
  }
  return (
    <div className={className}>
      <div className="card-body">
        <h2 className="text-xl text-black lg:text-sm xl:text-xl card-title">
          {formattedString.name}
          <span className="text-2xl lg:text-2xl xl:text-3xl">
            {formattedString.formattedValue} {formattedString.formatter}
          </span>
        </h2>
        <p>
          {formattedDate.toLocaleDateString("ko-KR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          })}
          기준
        </p>
      </div>
    </div>
  );
};

export default WeatherData;
