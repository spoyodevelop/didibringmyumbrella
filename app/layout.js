import { Inter } from "next/font/google";
import style from "../styles/index.css";

export const metadata = {
  title: "아맞다 우산",
  description: "실제 강수확률을 체크해보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
