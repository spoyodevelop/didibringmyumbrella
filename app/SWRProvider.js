"use client";
import { SWRConfig } from "swr";
export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,

        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // 404 상태 코드로 인한 오류는 재시도하지 않음
          if (error.status === 404) return;
          // 특정 키에 대해서는 재시도하지 않음
          if (key === "/api/weather/fetchweather") return;
          // 최대 재시도 횟수 제한
          if (retryCount >= 2) return;
          // 재시도 간격 설정
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
