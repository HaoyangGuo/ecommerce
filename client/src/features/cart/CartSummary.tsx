import {
	TableContainer,
	Paper,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Typography,
} from "@mui/material";
import { Cart } from "../../app/models/cart";
import currencyFormat from "../../util/currencyFormat";

export default function CartSummary({ cart }: { cart: Cart }) {
	const subtotal = cart.items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const deliveryFee = subtotal > 100 * 100 ? 0 : 15 * 100;

	return (
		<>
			<TableContainer component={Paper} variant={"outlined"}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>Subtotal</TableCell>
							<TableCell align="right">{currencyFormat(subtotal)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Delivery fee*</TableCell>
							<TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell align="right">
								{currencyFormat(subtotal + deliveryFee)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<span style={{ fontStyle: "italic" }}>
									*Orders over $100 qualify for free delivery
								</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
