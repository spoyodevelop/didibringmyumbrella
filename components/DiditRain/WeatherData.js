const WeatherData = ({ data, typeOfData, className }) => {
  function convertToDateTime(fcstDate, fcstTime) {
    // 날짜와 시간을 분리
    const year = String(fcstDate).substring(0, 4);
    const month = String(fcstDate).substring(4, 6) - 1; // JavaScript의 월은 0부터 시작하므로 1을 빼줍니다.
    const day = String(fcstDate).substring(6, 8);

    const hours = String(fcstTime).substring(0, 2);
    const minutes = String(fcstTime).substring(2, 4);

    // Date 객체 생성
    const dateObject = new Date(year, month, day, hours, minutes);

    return dateObject;
  }

  let formattedString;
  let formattedDate;
  if (typeOfData === "POP") {
    const { POP } = data;

    if (!POP) return;
    formattedDate = convertToDateTime(POP.POP.fcstDate, POP.POP.fcstTime);
    const formattedValue = POP.POP.fcstValue;
    const name = "예보강수확률";
    const formatter = "%";
    formattedString = { name, formatter, formattedValue };
  }
  if (typeOfData === "RN1") {
    const { RN1 } = data;
    if (!RN1) return;

    formattedDate = convertToDateTime(RN1.RN1.baseDate, RN1.RN1.baseTime);
    const formattedValue = RN1.RN1.obsrValue;

    const name = "강수량은";
    const formatter = "mm 입니다.";
    formattedString = { name, formattedValue, formatter };
  }
  return (
    <div className={className}>
      <div className="card-body">
        <h2 className="text-xl text-black card-title">
          {formattedString.name}
          <span className="text-4xl">
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
