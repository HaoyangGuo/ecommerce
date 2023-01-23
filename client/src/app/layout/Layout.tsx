import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

interface LayoutProps {
	toggleTheme: () => void;
	darkMode: boolean;
}

const Layout: React.FC<LayoutProps> = ({ toggleTheme, darkMode }) => {
	return (
		<>
			<Header toggleTheme={toggleTheme} darkMode={darkMode} />
			<Container>
				<Outlet />
			</Container>
		</>
	);
};

export default Layout;