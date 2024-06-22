// Loading.js
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-11/12 p-4 mt-20 mb-20 space-y-4 bg-gray-300 rounded-lg shadow-lg h-[40rem] animate-pulse">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
