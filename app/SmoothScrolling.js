"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
const lenisOptions = {
  lerp: 0.1,
  duration: 1.5,
  smoothTouch: true,
  smooth: true, // 추가 옵션: 스크롤 애니메이션의 부드러움을 조절
  ease: "easeInOutCubic", // 추가 옵션: 스크롤 애니메이션의 속도 곡선
  offset: -50, // 추가 옵션: 스크롤 시작 시점의 오프셋
  direction: "vertical", // 추가 옵션: 스크롤 방향
  threshold: 0.1, // 추가 옵션: 스크롤 이벤트 발생 시점의 임계값
};
function SmoothScrolling({ children }) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
