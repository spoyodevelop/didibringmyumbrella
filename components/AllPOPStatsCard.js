import { CircularProgressbar } from "react-circular-progressbar";
import {
  calculateArrayLength,
  financial,
  POPpercentage,
  transformDataForNivo,
} from "@/util/AllPOPstatsFormatting";
export default function AllPOPStatsCard({ className, percent, data }) {
  let icon = "🌥️";
  if (percent >= 50) {
    icon = "☁️";
  }
  if (percent >= 80) {
    icon = "🌧️";
  }
  return (
    <div className={className}>
      <div>
        <div className="flex flex-col items-center mb-8 space-x-4 lg:mr-4">
          <div className="text-3xl">{icon}</div>
          <h2 className="text-2xl font-bold text-blue-800">
            강수확률 {percent}% 이상일때,
          </h2>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="mt-4 text-blue-800 lg:mt-0">
                우산을 챙겼다면...{" "}
                <span className="font-semibold">
                  {financial(
                    calculateArrayLength(percent, data)?.Length / 136,
                    2
                  )}
                  일
                </span>{" "}
                동안 우산을 챙겼습니다.
              </p>
              <p className="mt-2 text-blue-800">
                <span className="font-semibold">
                  {financial(
                    calculateArrayLength(percent, data)?.Rain / 136,
                    1
                  )}
                  일
                </span>{" "}
                동안 비가 내렸습니다.
              </p>
              <p className="mt-2 text-blue-800">
                <span className="font-semibold">
                  {POPpercentage(percent, 2, data)}%
                </span>
                의 확률로 우산이 쓸모 있었습니다.
              </p>
            </div>
            <div className="w-1/4 h-1/4">
              <CircularProgressbar
                value={POPpercentage(percent, 2, data)}
                text={`${POPpercentage(percent, 2, data)}%`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
