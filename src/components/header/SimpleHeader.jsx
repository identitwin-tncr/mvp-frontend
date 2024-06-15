import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import theme from "../../theme";

const SimpleHeader = ({ title }) => {
    const upXLScreenSize = useMediaQuery(theme.breakpoints.up("xl"));
    return (
        <Typography variant={upXLScreenSize ? "h4" : "h5"} fontWeight="bold">
            {title}
        </Typography>
    );
};

SimpleHeader.propTypes = {
    title: PropTypes.string,
};

export default SimpleHeader;
