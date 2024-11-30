export default function ErrorCard({ className }) {
  return (
    <div className={className}>
      <div className="card-body">
        <h2 className="text-2xl text-black">오류</h2>
        <p className="text-sm">
          현재 기상청 서버가 불안정하여 기상청 데이터를 가져오지 못했습니다.
          대신 아 맞다 우산에서 제공하는 데이터를 보여드립니다.
        </p>
      </div>
    </div>
  );
}
