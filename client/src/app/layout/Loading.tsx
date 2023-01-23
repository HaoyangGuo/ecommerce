import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
	message?: string;
}

const Loading: React.FC<Props> = ({ message = "Loading..." }) => {
	return (
		<Backdrop open={true} invisible>
			<Box
				display={"flex"}
				justifyContent="center"
				alignItems={"center"}
				height="100vh"
			>
				<CircularProgress size={100} />
				<Typography
					variant="h4"
					sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
				>
					{message}
				</Typography>
			</Box>
		</Backdrop>
	);
};

export default Loading;
