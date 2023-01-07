import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
	toggleTheme: () => void;
	darkMode: boolean;
}

const Header: React.FC<Props> = ({ toggleTheme, darkMode }) => {
	return (
		<AppBar position="static" sx={{ mb: 4 }}>
			<Toolbar>
				<Typography variant="h6">DHGUO STORE</Typography>
				<Switch
					checked={darkMode}
					onChange={toggleTheme}
          inputProps={{ "aria-label": "controlled" }}
          color="default"
				/>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
