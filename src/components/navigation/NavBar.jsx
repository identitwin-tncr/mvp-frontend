import {AppBar, Box, Toolbar} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Logo from "./components/Logo";
import NavBarItems from "./components/NavBarItems";
import {getMenuItems} from "../../utils/navigationUtils";

const NavBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const items = getMenuItems(location.pathname, navigate)
	
	return (
		<Box sx={{ display: "flex", mb: 10, mx: { lg: -20, md: -10, xs: -4 } }}>
            <AppBar
                component="nav"
                position="sticky"
                elevation={0}
                sx={{ backgroundColor: "#143846", px: { lg: 20, md: 10, xs: 2 }, pt: 1, pb: 2 }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Logo navigate={navigate} />
					<NavBarItems items={items} />
                </Toolbar>
            </AppBar>
        </Box>
	);
};

export default NavBar;
