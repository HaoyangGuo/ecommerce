import { useEffect, useState } from "react";
import axios from "axios";
import {
	Grid,
	IconButton,
	Typography,
	Box,
	Divider,
	TableContainer,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { type Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/layout/Loading";
import currencyFormat from "../../util/currencyFormat";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

const ProductDetails = () => {
	const { cart, setCart, removeItem } = useStoreContext();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(false);
	const { productId } = useParams<{ productId: string }>();
	const [quantity, setQuantity] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const item = cart?.items.find((x) => x.productId === product?.id);

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (parseInt(e.target.value) <= 0) return;
		setQuantity(parseInt(e.target.value));
	};

	const handleUpdateCart = () => {
		setSubmitting(true);
		if (!item || item.quantity < quantity) {
			agent.Cart.addItem(
				product!.id,
				item ? quantity - item.quantity : quantity
			)
				.then((cart) => setCart(cart))
				.catch((error) => console.log(error.response))
				.finally(() => setSubmitting(false));
		} else {
			agent.Cart.removeItem(product!.id, item.quantity - quantity)
				.then(() => removeItem(product!.id, item.quantity - quantity))
				.catch((error) => console.log(error.response))
				.finally(() => setSubmitting(false));
		}
	};

	useEffect(() => {
		if (item) setQuantity(item.quantity);
		setLoading(true);
		agent.Catalog.details(parseInt(productId!))
			.then((product) => setProduct(product))
			.catch((error) => console.log(error.response))
			.finally(() => setLoading(false));
	}, [productId, item]);

	if (loading) return <Loading message="Loading product" />;
	if (!product) return <NotFound />;

	return (
		<>
			<Box component={Link} to={"/catalog"} sx={{ mb: 2 }}>
				<IconButton>
					<ArrowBack />
				</IconButton>
			</Box>
			<Grid container spacing={6}>
				<Grid item xs={12} sm={6}>
					<img
						src={product.pictureUrl}
						alt={product.name}
						style={{ width: "100%" }}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant="h4" color={"primary"}>
						{product.name}
					</Typography>
					<Divider sx={{ my: 2 }} />
					<Typography variant="h5"> {currencyFormat(product.price)}</Typography>
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>{product.name}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Description</TableCell>
									<TableCell>{product.description}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Type</TableCell>
									<TableCell>{product.type}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Brand</TableCell>
									<TableCell>{product.brand}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Quantity in stock</TableCell>
									<TableCell>{product.quantityInStock}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
						<Grid item xs={6}>
							<TextField
								variant="outlined"
								type="number"
								label="Quantity in Cart"
								fullWidth
								value={quantity}
								onChange={handleQuantityChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<LoadingButton
								size="large"
								variant="contained"
								sx={{ height: "55px" }}
								loading={submitting}
								onClick={handleUpdateCart}
								disabled={quantity === item?.quantity || !item && quantity === 0}
							>
								{item ? "Update Quantity" : "Add to Cart"}
							</LoadingButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default ProductDetails;
