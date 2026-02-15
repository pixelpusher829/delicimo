import { Route, Routes } from "react-router";
import {Home, Recipe} from "@/pages";
import Root from "@/layout/Root";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Root />} >
				<Route index element={<Home />} />
				<Route path="/recipe/:id" element={<Recipe/>}/>
			</Route>
		</Routes>
	);
}

export default App;
