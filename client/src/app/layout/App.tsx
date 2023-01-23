import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import NotFound from "../errors/NotFound";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import CartPage from "../../features/cart/CartPage";
import { useStoreContext } from "../context/StoreContext";
import getCookie from "../../util/getCookie";
import agent from "../api/agent";
import Loading from "./Loading";
import CheckoutPage from "../../features/checkout/checkoutPage";

function App() {
	const { setCart } = useStoreContext();
	const [loading, setLoading] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const toggleTheme = () => setDarkMode(!darkMode);

	useEffect(() => {
		const buyerId = getCookie("buyerId");
		if (buyerId) {
			setLoading(true);
			agent.Cart.get()
				.then((cart) => setCart(cart))
				.catch((error) => console.log(error))
				.finally(() => setLoading(false));
		}
	}, [setCart]);

	const theme = createTheme({
		palette: {
			primary: {
				main: darkMode ? "#2dd4bf" : "#2a8683",
			},
			secondary: {
				main: darkMode ? "#6366f1" : "#4338ca",
			},
			mode: darkMode ? "dark" : "light",
			background: {
				default: darkMode ? "#333" : "#fafafa",
			},
		},
	});

	if (loading) return <Loading message="Initializing app..." />;

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position="bottom-right" hideProgressBar />
			<CssBaseline />
			<Routes>
				<Route
					path="/"
					element={<Layout toggleTheme={toggleTheme} darkMode={darkMode} />}
				>
					<Route path="/" element={<HomePage />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/catalog/:productId" element={<ProductDetails />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/checkout" element={<CheckoutPage />} />
					<Route path="/server-error" element={<ServerError />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
