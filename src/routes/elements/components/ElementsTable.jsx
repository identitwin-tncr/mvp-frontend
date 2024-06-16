import React from "react";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const ElementsTable = ({ items, value1, value2 }) => {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper} variant="outlined">
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Categoría
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Código
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Piso
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Bloque
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Unidad tecnológica
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Orientación
                        </TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell align="left">{`${item.elementType.value}`}</TableCell>
                            <TableCell align="left">{item.code}</TableCell>
                            <TableCell align="left">{item.block.floor}</TableCell>
                            <TableCell align="left">{item.block.value}</TableCell>
                            <TableCell align="left">{item.elementType.technologicalUnit.value}</TableCell>
                            <TableCell align="left">{(item.number? item.number : "--") + " " + (item.orientation.value? item.orientation.value : "--")}</TableCell>
                            <TableCell align="left"></TableCell>
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

ElementsTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.Object),
};

export default ElementsTable;
