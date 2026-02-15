import { Link } from "react-router";

const Header = () => {
	return (
		<nav className="bg-white/90 backdrop-blur-lg fixed w-full z-10">
			<div className="px-6 py-4 max-w-360 m-auto">
				<Link to="/" className="flex items-center gap-3">
					<img src="/delicimo.svg" alt="Delicimo logo" className="w-9" />
					<span className="text-2xl font-semibold">Delicimo</span>
				</Link>
			</div>
		</nav>
	);
};

export default Header;
