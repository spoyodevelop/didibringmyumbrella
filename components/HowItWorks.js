import React from "react";
import { useSpring, animated } from "react-spring";

const HowItWorks = ({ className }) => {
  // 텍스트가 나타날 때 사용할 애니메이션 설정
  const fadeTextAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000, // 애니메이션 시작 지연 시간 (밀리초)
  });

  return (
    <section className={className}>
      <h1 className="mb-8 text-2xl font-bold text-center text-black">
        실제 강수 확률이란?
      </h1>
      <animated.p style={fadeTextAnimation} className="mb-4 text-gray-700">
        기상청에서 강수 확률을 30%로 예보했다고 가정해봅시다. 여기서 실제 강수
        확률이란, 실제로 30%라고 예보한 날들 중에서 얼마나 자주 비가 내렸는지를
        의미해요.
      </animated.p>
      {/* 나머지 내용 */}
    </section>
  );
};

export default HowItWorks;
