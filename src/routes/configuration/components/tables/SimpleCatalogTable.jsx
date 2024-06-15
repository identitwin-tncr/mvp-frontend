import React from "react";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import SingleButtonHeader from "../../../../components/header/SimpleButtonHeader";

const SimpleCatalogTable = ({ items, value1, value2 }) => {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper} variant="outlined">
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            {value1}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            {value2}
                        </TableCell>
                        {/*<strong onClick={()=>navigate("incluir")}>
                            agregar
                        </strong>*/}
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell align="left">{`${item.value}`}</TableCell>
                            <TableCell align="left">{item.code}</TableCell>
                            <TableCell align="left">
                                <IconButton onClick={() => navigate("modificar", { state: { item } })}>
                                    <EditIcon color="primary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

SimpleCatalogTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.Object),
};

export default SimpleCatalogTable;
