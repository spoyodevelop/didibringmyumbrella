import style from "../styles/index.css";
import SWRProvider from "./SWRProvider";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import SmoothScrolling from "./SmoothScrolling";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  title: "아맞다 우산",
  description: "실제 강수확률을 체크해보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
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
