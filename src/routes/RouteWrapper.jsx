import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../components/navigation/NavBar";

const RouteWrapper = () => {
    return (
        <Box sx={{ px: { lg: 20, md: 10, xs: 2 }, mb: 10 }}>
            <NavBar />
            <Outlet />
            {/*<SnackBarMessage />*/}
            {/*<ModalMessage />*/}
        </Box>
    );
};

export default RouteWrapper;