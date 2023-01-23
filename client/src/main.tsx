import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/layout/App";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import { NavigateSetter } from "../src/util/History";
import { StoreContextProvider } from "./app/context/StoreContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<StoreContextProvider>
				<NavigateSetter />
				<App />
			</StoreContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
