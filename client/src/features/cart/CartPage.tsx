import {
	Box,
	Button,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useState } from "react";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import CartSummary from "./CartSummary";
import currencyFormat from "../../util/currencyFormat";
import { Link } from "react-router-dom";

const CartPage = () => {
	const [status, setStatus] = useState({
		loading: false,
		name: "",
	});
	const { cart, removeItem, setCart } = useStoreContext();

	const handleAddItem = (productId: number, name: string) => {
		setStatus({ loading: true, name });
		agent.Cart.addItem(productId)
			.then((cart) => setCart(cart))
			.catch((error) => console.log(error))
			.finally(() => setStatus({ loading: false, name: "" }));
	};

	const handleRemoveItem = (
		productId: number,
		quantity: number = 1,
		name: string
	) => {
		setStatus({ loading: true, name });
		agent.Cart.removeItem(productId)
			.then(() => removeItem(productId, quantity))
			.catch((error) => console.log(error))
			.finally(() => setStatus({ loading: false, name }));
	};

	if (!cart) return <Typography variant="h3">Your cart is empty</Typography>;

	return (
		<div style={{paddingBottom: "2rem"}}>
			<h1>Buyer Id = {cart.buyerId}</h1>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="center">Quantity</TableCell>
							<TableCell align="right">Subtotal</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cart.items.map((item) => {
							return (
								<TableRow
									key={item.productId}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell
										component="th"
										scope="row"
										sx={{ whiteSpace: "nowrap" }}
									>
										<Box display="flex" alignItems={"center"}>
											<img
												src={item.pictureUrl}
												alt={item.name}
												style={{ height: 50, marginRight: 20 }}
											/>
											<span>{item.name}</span>
										</Box>
									</TableCell>
									<TableCell align="right">
										{currencyFormat(item.price)}
									</TableCell>
									<TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
										<LoadingButton
											color="error"
											loading={
												status.loading &&
												status.name === "remove" + item.productId
											}
											onClick={() =>
												handleRemoveItem(
													item.productId,
													1,
													"remove" + item.productId
												)
											}
										>
											<Remove />
										</LoadingButton>
										{item.quantity}
										<LoadingButton
											color="secondary"
											loading={
												status.loading && status.name === "add" + item.productId
											}
											onClick={() =>
												handleAddItem(item.productId, "add" + item.productId)
											}
										>
											<Add />
										</LoadingButton>
									</TableCell>
									<TableCell align="right">
										{currencyFormat(item.price * item.quantity)}
									</TableCell>
									<TableCell align="right">
										<LoadingButton
											color="error"
											loading={
												status.loading &&
												status.name === "delete" + item.productId
											}
											onClick={() =>
												handleRemoveItem(
													item.productId,
													item.quantity,
													"delete" + item.productId
												)
											}
										>
											<Delete />
										</LoadingButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Grid container>
				<Grid item xs={0} md={6}></Grid>
				<Grid item xs={12} md={6}>
					<CartSummary cart={cart} />
					<Button
						component={Link}
						to="/checkout"
						variant="contained"
						color="secondary"
						size="large"
						fullWidth
					>
						Checkout
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default CartPage;
