import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import PropTypes from "prop-types";

const Paginator = ({ page, onPageChangeHandler, isThereNextResultsPage }) => {
    return (
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
            <IconButton disabled={page === 1} onClick={() => onPageChangeHandler(page > 1 ? page - 1 : 0)}>
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography>{page}</Typography>
            <IconButton disabled={!isThereNextResultsPage} onClick={() => onPageChangeHandler(page + 1)}>
                <KeyboardArrowRightIcon />
            </IconButton>
        </Stack>
    );
};

Paginator.propTypes = {
    isThereNextResultsPage: PropTypes.bool,
    page: PropTypes.number,
    onPageChangeHandler: PropTypes.func,
};

export default Paginator;
