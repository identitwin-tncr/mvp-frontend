import React from "react";
import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";
import SimpleHeader from "./SimpleHeader";

const SingleButtonHeader = ({ title, buttonLabel, buttonOnClickHandler }) => {
    return (
        <Stack
            alignItems={{ xs: "flex-start", lg: "center" }}
            gap={{ xs: 2, lg: 0 }}
            direction={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
        >
            <SimpleHeader title={title} />
            <Button variant="contained" onClick={buttonOnClickHandler}>
                {buttonLabel}
            </Button>
        </Stack>
    );
};

SingleButtonHeader.propTypes = {
    title: PropTypes.string,
    buttonLabel: PropTypes.string,
    buttonOnClickHandler: PropTypes.func,
};

export default SingleButtonHeader;
