import style from "../styles/index.css";
import SWRProvider from "./SWRProvider";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import SmoothScrolling from "./SmoothScrolling";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { inject } from "@vercel/analytics";
import { icons } from "lucide-react";
const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ["latin"], // 또는 preload: false
  weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});
const roboto = Roboto({
  subsets: ["latin"], // preload에 사용할 subsets입니다.
  weight: ["100", "400", "700"],
  variable: "--roboto", // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
});
export const cls = (...classnames) => {
  return classnames.join(" ");
};
export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "아 맞다 우산 | 실시간 강수확률 및 실제 강수 확률 정보",
  description:
    "오늘 우산을 챙겨야 할지 고민되시나요? 실시간 강수확률과 실제 강수 확률를 비교하여 우산이 필요한지 알아보세요.",
  keywords:
    "우산, 날씨, 실시간 강수확률, 날씨 정보, 비, 우산 챙기기, 기상 예보",
  author: "Spoy",
  openGraph: {
    title: "아 맞다 우산 | 실시간 강수확률 및 실제 강수 확률 정보",
    description:
      "오늘 우산을 챙겨야 할지 고민되시나요? 실시간 강수확률과 실제 강수 확률를 비교하여 우산이 필요한지 알아보세요.",
    url: "https://didibringmyumbrella.site/",
  },
  twitter: {
    card: "summary",
    title: "아 맞다 우산 | 실시간 강수확률 및 실제 강수 확률 정보",
    description:
      "오늘 우산을 챙겨야 할지 고민되시나요? 실시간 강수확률과 실제 강수 확률를 비교하여 우산이 필요한지 알아보세요.",
  },
  canonical: "https://didibringmyumbrella.site/",
};

export default function RootLayout({ children }) {
  inject();
  return (
    <html lang="ko" data-theme="dark">
      <body>
        <SmoothScrolling>
          <main
            className={
              cls(notoSansKr.className, roboto.variable) +
              " flex flex-col items-center justify-center min-h-screen"
            }
          >
            <SWRProvider>{children}</SWRProvider>
          </main>
          <SpeedInsights />
        </SmoothScrolling>
      </body>
    </html>
  );
}
