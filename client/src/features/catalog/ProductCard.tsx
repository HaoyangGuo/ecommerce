import {
	CardMedia,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { useStoreContext } from "../../app/context/StoreContext";
import currencyFormat from "../../util/currencyFormat";

interface Props {
	product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
	const [loading, setLoading] = useState(false);
	const {setCart} = useStoreContext();	

	const handleAddItem = (productId: number) => {
		setLoading(true);
		agent.Cart.addItem(productId)
			.then((cart) => setCart(cart))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	};

	return (
		<Card>
			<CardMedia
				sx={{
					height: 200,
					backgroundSize: "contain",
					bgcolor: "primary.light",
				}}
				image={product.pictureUrl}
				title={product.name}
			/>
			<CardContent>
				<Typography
					gutterBottom
					variant="subtitle1"
					sx={{ fontWeight: "bold" }}
					color={"primary"}
				>
					{product.name}
				</Typography>
				<Typography gutterBottom color={""} variant="h6">
					{currencyFormat(product.price)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.brand} / {product.type}
				</Typography>
			</CardContent>
			<CardActions>
				<LoadingButton
					loading={loading}
					size="small"
					variant="contained"
					onClick={() => handleAddItem(product.id)}
				>
					ADD TO CART
				</LoadingButton>
				<Button
					component={Link}
					sx={{ ml: 1 }}
					to={`/catalog/${product.id}`}
					size="small"
					variant="contained"
				>
					VIEW
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
