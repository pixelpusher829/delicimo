import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Root = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Root;
