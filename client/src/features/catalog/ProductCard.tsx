import {
	CardMedia,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
	CardHeader,
	Avatar,
} from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
	product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: "primary.light" }}>
						{product.name[0].toUpperCase()}
					</Avatar>
				}
				title={product.name}
				titleTypographyProps={{
					sx: { fontWeight: "bold", color: "primary.main" }
				}}
			/>
			<CardMedia
				sx={{ height: 140, backgroundSize: "contain", bgcolor: "primary.light" }}
				image={product.pictureUrl}
				title={product.name}
			/>
			<CardContent>
				<Typography gutterBottom color={""} variant="h5">
					${product.price.toFixed(2)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{product.brand} / {product.type}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
