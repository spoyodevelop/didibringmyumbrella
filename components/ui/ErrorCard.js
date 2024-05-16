export default function ErrorCard({ className }) {
  return (
    <div className={className}>
      <div className="card-body">
        <h2 className="text-2xl text-black">오류</h2>
        <p className="text-sm">
          데이터를 가져오는데 실패했습니다. 잠시 후 다시 이용해 주세요.
        </p>
      </div>
    </div>
  );
}
