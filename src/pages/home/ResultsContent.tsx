import ResultCard from "./ResultCard";

const ResultsContent: React.FC = () => {
  return (
    <div className="mt-6 grid grid-cols-5 gap-6">
      <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard />
    </div>
  );
};

export default ResultsContent;
