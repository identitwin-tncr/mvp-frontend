import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import PropTypes from "prop-types";

/**
 * General purpose container component.
 * @param {Node} children -Contents.
 * @returns {Element}
 * @constructor
 */
const ContentLayout = ({ children, pgap}) => {
    console.log("pgap:" +  pgap)
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper elevation={0} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
                <Stack gap={pgap==undefined? 4 : pgap}>{children}</Stack>
            </Paper>
        </Box>
    );
};

ContentLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContentLayout;
