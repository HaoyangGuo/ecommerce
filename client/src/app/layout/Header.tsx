import { ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";
import {
	AppBar,
	Badge,
	IconButton,
	List,
	ListItem,
	Switch,
	Toolbar,
	Typography,
	useMediaQuery,
	Menu,
	MenuItem,
	Box,
	ListItemText,
} from "@mui/material";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

interface Props {
	toggleTheme: () => void;
	darkMode: boolean;
}

const midLinks = [
	{ title: "catalog", path: "/catalog" },
	{ title: "about", path: "/about" },
	{ title: "contact", path: "/contact" },
];

const rightLinks = [
	{ title: "login", path: "/login" },
	{ title: "register", path: "/register" },
];

const navStyles = {
	color: "inherit",
	textDecoration: "none",
	"&:hover": {
		color: "secondary.main",
	},
	"&.active": {
		color: "secondary.main",
	},
};

const Header: React.FC<Props> = ({ toggleTheme, darkMode }) => {
	const matches = useMediaQuery("(min-width:864px)");
	const { cart } = useStoreContext();
	const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<AppBar position="static" sx={{ mb: 4 }}>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h6"
						sx={navStyles}
						component={Link}
						to={"/"}
						color="inherit"
					>
						DHGUO STORE
					</Typography>
					<Switch
						checked={darkMode}
						onChange={toggleTheme}
						inputProps={{ "aria-label": "controlled" }}
						color="default"
					/>
				</Box>
				{matches ? (
					<>
						<List sx={{ display: "flex" }}>
							{midLinks.map(({ title, path }) => (
								<ListItem
									component={NavLink}
									sx={navStyles}
									key={path}
									to={path}
								>
									<Typography variant="h6">{title.toUpperCase()}</Typography>
								</ListItem>
							))}
						</List>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<IconButton
								component={Link}
								to="/cart"
								size="large"
								sx={{ color: "inherit" }}
							>
								<Badge badgeContent={itemCount} color="secondary">
									<ShoppingCart />
								</Badge>
							</IconButton>
							<List sx={{ display: "flex" }}>
								{rightLinks.map(({ title, path }) => (
									<ListItem
										component={NavLink}
										key={path}
										to={path}
										sx={navStyles}
									>
										<Typography variant="h6">{title.toUpperCase()}</Typography>
									</ListItem>
								))}
							</List>
						</Box>
					</>
				) : (
					<NavMenu />
				)}
			</Toolbar>
		</AppBar>
	);
};

const NavMenu: React.FC = () => {
	const { cart } = useStoreContext();
	const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ ml: "auto" }}>
			<IconButton
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<MenuIcon color="inherit" />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				PaperProps={{
					sx: {
						width: 180,
						display: "flex",
						flexDirection: "column",
						textAlign: "center",
					},
				}}
			>
				{midLinks.map(({ title, path }) => (
					<MenuItem
						component={NavLink}
						key={path}
						to={path}
						onClick={handleClose}
					>
						<ListItemText style={{ textAlign: "center" }}>
							{title.toUpperCase()}
						</ListItemText>
					</MenuItem>
				))}
				{rightLinks.map(({ title, path }) => (
					<MenuItem
						component={NavLink}
						key={path}
						to={path}
						onClick={handleClose}
					>
						<ListItemText style={{ textAlign: "center" }}>
							{title.toUpperCase()}
						</ListItemText>
					</MenuItem>
				))}

				<IconButton
					component={Link}
					to="/cart"
					onClick={handleClose}
					size="large"
					sx={{ color: "inherit", mt: "0.75rem" }}
				>
					<Badge badgeContent={itemCount} color="secondary">
						<ShoppingCart />
					</Badge>
				</IconButton>
			</Menu>
		</Box>
	);
};

export default Header;
