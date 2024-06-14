import {Button, Stack} from "@mui/material";
import PropTypes from "prop-types";

const NavBarItems = ({items}) => {
	return (
		<Stack gap={4} direction="row" sx={{ display: { xs: "none", lg: "flex" } }}>
            {items.length &&
                items.map((item) => {
                    return (
                        <Button
                            onClick={item.handler}
                            key={item.label}
                            sx={{
                                textTransform: "none",
                                fontWeight: 400,
                                fontSize: "1rem",
								color: "white"
                            }}
                        >
                            {item.label}
                        </Button>
                    );
                })}
        </Stack>
	)
}

NavBarItems.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
};

export default NavBarItems;
