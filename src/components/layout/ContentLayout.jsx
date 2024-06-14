import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import PropTypes from "prop-types";

/**
 * General purpose container component.
 * @param {Node} children -Contents.
 * @returns {Element}
 * @constructor
 */
const ContentLayout = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper elevation={0} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
                <Stack gap={4}>{children}</Stack>
            </Paper>
        </Box>
    );
};

ContentLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContentLayout;
