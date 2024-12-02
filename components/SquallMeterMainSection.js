// import React from "react";
// import { useWeatherStore } from "@/app/store/weather-store";
// import { FaCloudRain, FaUmbrella } from "react-icons/fa";

// const SquallMeterMainSection = ({ className }) => {
//   const { allOfPOPDataStats, allOfPOPData } = useWeatherStore();
//   const now = new Date();
//   const startDate = new Date(2024, 3, 21);
//   const diffInMilliseconds = now - startDate;

//   // Convert milliseconds to days
//   const daysPassed = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

//   return (
//     <section
//       className={`${className} p-2 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg`}
//     >
//       <section className="flex flex-col space-y-8">
//         <div className="flex items-center gap-4 mb-8">
//           <h1 className="text-2xl font-bold text-blue-700 lg:text-3xl">
//             <FaCloudRain className="inline-block mb-1 mr-2 text-blue-500" />
//             방금까지만 해도 맑았는데...
//           </h1>
//         </div>
//         <div className="p-6 mb-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
//           <h2 className="mb-2 text-lg font-semibold text-blue-600 lg:text-xl">
//             갑작스런 비가 왔어요!
//           </h2>
//           <p className="leading-relaxed text-gray-700">
//             예보에서는 분명 비가 안온다고 했는데,{" "}
//             {allOfPOPDataStats["POP0"].didItRainCount}번이나 비가 온적이 있어요.
//             총 {allOfPOPDataStats["POP0"].arrayLength}번의 0% 강수예보중,{" "}
//             {allOfPOPDataStats["POP0"].didItRainCount}번이 비가 왔어요. 또, 총{" "}
//             {allOfPOPDataStats["POP30"].arrayLength}번의 30% 강수예보중,{" "}
//             {allOfPOPDataStats["POP30"].didItRainCount}번이 비가 왔어요.
//           </p>
//         </div>
//         <div className="p-6 mb-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
//           <h2 className="mb-2 text-lg font-semibold text-blue-600 lg:text-xl">
//             {allOfPOPDataStats["totalArrayCount"]}개의 강수확률 예보를 분석한
//             결과에요.
//           </h2>
//           <p className="leading-relaxed text-gray-700">
//             2024년 4월 21일부터 지금까지, 총 {daysPassed}일 동안 자료를 긁어
//             모았어요.
//           </p>
//         </div>
//         <div className="self-center p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
//           <div className="flex flex-col items-center justify-center">
//             <h2 className="mb-4 text-2xl font-semibold text-center text-blue-700 lg:text-3xl">
//               갑작스런 비가 오면 올수록 소나기미터가 높아져요.
//             </h2>
//             <p className="mb-4 text-center text-gray-700">
//               기후변화가 심해지면서 점점 더 소나기미터가 높아질까요?
//             </p>
//             <FaUmbrella className="text-5xl text-blue-500" />
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default SquallMeterMainSection;
