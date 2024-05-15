import POPDataSelection from "./POPdataSelection";
import GraphIcon from "./icons/GraphIcon";
import QuestionIcon from "./icons/QuestionButton";

export default function POPExplanation({ className, onClick }) {
  return (
    <div className={className}>
      <POPDataSelection className="self-center max-w-xs mb-4 md:self-start select select-bordered" />
      <div className="p-0 card-body">
        <GraphIcon className="w-12 h-12" />
        <div className="flex items-center gap-2 ">
          <h2 className="mb-1 text-3xl text-black card-title">
            실제 강수 확률 그래프
          </h2>
          <QuestionIcon buttonSize="sm" onClick={onClick} />
        </div>

        <p className="text-lg">
          실제 강수 확률을 그래프로 나타냈어요. 10%단위(0%, 10%....100%)로
          나누어져 있어요. 그래프에 커서를 올리면, 조금 더 자세한 데이터를
          확인할수 있어요.{"   "}
        </p>
      </div>
    </div>
  );
}
