import ResultsBar from "./ResultsBar";
import ResultsContent from "./ResultsContent";

const Results: React.FC = () => {
	return (
		<div className=" bg-neutral-100 pt-8 pb-10">
			<div className="max-w-360 m-auto p-6">
				<ResultsBar />
				<ResultsContent />
			</div>
		</div>
	);
};

export default Results;
