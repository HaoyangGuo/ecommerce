import { Paper, Container, Typography, Divider, Button } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

const ServerError = () => {
	const { state } = useLocation();

	return (
		<Container component={Paper} sx={{
			py: 2,
		}}>
			{state?.error && (
				<>
					<Typography variant="h3" color={"error"} gutterBottom>
						{state.error.title}
					</Typography>
					<Divider />
					<Typography>
						{state.error.detail || "Internal server error"}
					</Typography>
				</>
			)}
			<Button component={Link} to="/catalog" variant="outlined">
				Go back to the store
			</Button>
		</Container>
	);
};

export default ServerError;
