import {Button, Stack, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const NavBarItems = ({items}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [submenuItems, setSubmenuItems] = useState([]);

    const handleHover = (event, children) => {
        if (children) {
            setAnchorEl(event.currentTarget);
            setSubmenuItems(children);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSubmenuItems([]);
    };

	return (
        <Stack gap={4} direction="row" sx={{ display: { xs: "none", lg: "flex" } }}>
            {items.map((item) => (
                <div
                    key={item.label}
                    onMouseEnter={(e) => handleHover(e, item.children)}
                    onMouseLeave={handleClose}
                >
                    <Button
                        onClick={() => item.path && navigate(item.path)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 400,
                            fontSize: "1rem",
                            color: "white",
                        }}
                    >
                        {item.label}
                    </Button>

                    {item.children && (
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl) && submenuItems === item.children}
                            onClose={handleClose}
                            MenuListProps={{ onMouseLeave: handleClose }}
                        >
                            {submenuItems.map((child) => (
                                <MenuItem
                                    key={child.label}
                                    onClick={() => navigate(child.path)}
                                >
                                    {child.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                </div>
            ))}
        </Stack>
    );
};

NavBarItems.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        handler: PropTypes.func,
        children: PropTypes.array
    })),
};

export default NavBarItems;
