
import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Form container component with submit handling.
 * @param {Node} children - Form fields and contents.
 * @param {function} submitHandler - On form submit handler.
 * @param {(string|object)} layoutWidth - Form container width.
 * @returns {Element}
 * @constructor
 */
const FormLayout = ({ children, submitHandler, layoutWidth = "100%" }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                sx={{ p: 4, width: layoutWidth, borderRadius: 2 }}
                elevation={0}
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                }}
            >
                <Stack gap={4}>{children}</Stack>
            </Paper>
        </Box>
    );
};

FormLayout.propTypes = {
    children: PropTypes.node.isRequired,
    submitHandler: PropTypes.func.isRequired,
    layoutWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default FormLayout;