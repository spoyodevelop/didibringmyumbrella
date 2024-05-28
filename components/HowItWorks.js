import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const HowItWorks = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.5 } // Change this threshold as needed
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const fadeTextAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    delay: isVisible ? 500 : 0,
  });

  const scaleSectionAnimation = useSpring({
    transform: isVisible ? "scale(1)" : "scale(0.95)",
    from: { transform: "scale(0.95)" },
    delay: isVisible ? 300 : 0,
  });

  return (
    <animated.section
      ref={sectionRef}
      style={scaleSectionAnimation}
      className={`${className} py-12 bg-blue-100 rounded-xl shadow-xl mt-10`}
    >
      <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">
        실제 강수 확률이란?
      </h1>
      <div className="p-4">
        <animated.p style={fadeTextAnimation} className="mb-4 text-gray-700">
          기상청에서 강수 확률을 30%로 예보했다고 가정해봅시다. 여기서 실제 강수
          확률이란, 실제로 30%라고 예보한 날들 중에서 얼마나 자주 비가
          내렸는지를 의미해요.
        </animated.p>
      </div>
      {/* 나머지 내용 */}
    </animated.section>
  );
};

export default HowItWorks;
