import { Search } from "lucide-react";

const Hero: React.FC = () => {
	return (
		<div className="relative overflow-hidden bg-[url('../assets/hero.webp')]">
			<div className="absolute inset-0 z-0 bg-black/5"></div>
			<div className="relative z-2 flex flex-col items-left align-center justify-center m-auto max-w-360 min-h-100 p-6 mt-20">
				<div className="flex gap-4 max-w-xl flex-col">
					<h1 className="text-5xl">
						Wholesome Recipes For <wbr /> The Whole Family
					</h1>
					<span className="text-2xl">Smarter search for everyday cooking.</span>
					<form className="bg-white flex w-fit rounded-full p-1 mt-4">
						<input
							className="px-4 py-2 min-w-64"
							type="text"
							placeholder="Search for a recipe..."
						/>
						<button
							type="submit"
							className="flex bg-yellow-500 text-white px-4 py-2  rounded-full gap-2 hover:bg-yellow-400 transition-colors items-center"
						>
							Search
							<Search className="w-5" />
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Hero;
