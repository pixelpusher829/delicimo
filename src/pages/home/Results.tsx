import ResultsBar from "./ResultsBar";
import ResultsContent from "./ResultsContent";

const Results: React.FC = () => {
  return (
    <div className="bg-neutral-100 px-6 pt-12 pb-16">
      <div className="m-auto max-w-360">
        <ResultsBar />
        <ResultsContent />
      </div>
    </div>
  );
};

export default Results;
