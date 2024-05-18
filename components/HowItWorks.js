const HowItWorks = ({ className }) => {
  return (
    <section className={className}>
      <h1 className="mb-8 text-2xl font-bold text-center text-black">
        실제 강수 확률이란?
      </h1>
      <p className="mb-4 text-gray-700">
        기상청에서 강수 확률을 30%로 예보했다고 가정해봅시다. 여기서 실제 강수
        확률이란, 실제로 30%라고 예보한 날들 중에서 얼마나 자주 비가 내렸는지를
        의미해요.
      </p>
      <div className="p-4 mb-4 bg-blue-200 rounded-lg shadow-md">
        <p className="text-blue-500">
          예를 들어, 기상청이 30% 확률로 강수 확률을 10번 예보했는데, 실제로 그
          중 2번 비가 내렸다면, 강수 확률 30%의 실제 강수 확률은 2/10, 즉 20%가
          되는 것입니다.
        </p>
      </div>
      <div className="flex items-center justify-center mt-4"></div>
    </section>
  );
};

export default HowItWorks;
