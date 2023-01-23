import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Container component={Paper} sx={{ height: 400, py: 2 }}>
			<Typography variant="h3" color="error" gutterBottom>
				Oops, we cannot find this page
			</Typography>
			<Divider />
			<Button sx={{mt: 2}} component={Link} to="/catalog" variant="outlined">
				Go back to the store
			</Button>
		</Container>
	);
};

export default NotFound;
