import React from "react";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const InstrumentsTable = ({ items, value1, value2 }) => {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper} variant="outlined">
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Instrumento
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Código
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Modelo
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Código de activo
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Bloque
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Frecuencia de monitoreo
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Tipo
                        </TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell align="left">{item.value}</TableCell>
                            <TableCell align="left">{item.code}</TableCell>
                            <TableCell align="left">{item.model}</TableCell>
                            <TableCell align="left">{item.assetCode}</TableCell>
                            <TableCell align="left">{item.block.value}</TableCell>
                            <TableCell align="left">{item.monitoringFrequency.value}</TableCell>
                            <TableCell align="left">{item.instrumentType.value}</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">
                                <IconButton onClick={() => navigate("/instrumentos/modificar/"+item.id, { state: { item } })}>
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

InstrumentsTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.Object),
};

export default InstrumentsTable;
