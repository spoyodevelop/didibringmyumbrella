export default function AllPOPStatsSelect({
  onChange,
  selectedPOP,
  className,
}) {
  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold text-blue-800 md:text-2xl whitespace-nowrap">
        강수확률이
      </h2>
      <select
        className="text-2xl text-center text-white select select-bordered bg-primary"
        onChange={onChange}
        value={selectedPOP}
      >
        <option value={0}>0</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
        <option value={60}>60</option>
        <option value={70}>70</option>
        <option value={80}>80</option>
        <option value={90}>90</option>
        <option value={100}>100</option>
      </select>
      <h2 className="text-2xl font-bold text-blue-800 md:text-2xl whitespace-nowrap">
        이상일때 우산을 들고 간다면?
      </h2>
    </div>
  );
}
