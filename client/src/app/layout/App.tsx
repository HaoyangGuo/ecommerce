import "./App.css";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import {
	Container,
	createTheme,
	CssBaseline,
	ThemeProvider,
	ThemeOptions,
} from "@mui/material";
import { teal, blue } from "@mui/material/colors";
import { useState } from "react";

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const toggleTheme = () => setDarkMode(!darkMode);

	const theme = createTheme({
		palette: {
			primary: {
				main: darkMode ? "#2dd4bf" : "#0d9488",
			},
			secondary: {
				main: "#6366f1",
			},
			mode: darkMode ? "dark" : "light",
			background: {
				default: darkMode ? "#333" : "#fafafa",
			},
		},
	});

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header toggleTheme={toggleTheme} darkMode={darkMode} />
				<Container>
					<Catalog />
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
