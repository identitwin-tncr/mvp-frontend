import React from "react";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const AlarmsTable = ({ items, value1, value2 }) => {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper} variant="outlined">
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Variable
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Instrumento
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Bloque
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Instrumento
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Fecha
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="left">
                            Estado
                        </TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell align="left">{`${item.variable.value}`}</TableCell>
                            <TableCell align="left">{item.instrument}</TableCell>
                            <TableCell align="left">{item.block.value}</TableCell>
                            <TableCell align="left">{item.instrument}</TableCell>
                            <TableCell align="left">{item.raisedDate}</TableCell>
                            <TableCell align="left">{item.status === 'ACTIVE'? 'Activa': 'Revisada'}</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">
                                <IconButton onClick={() => navigate("/alarmas/" + item.id)}>
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

AlarmsTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
};

export default AlarmsTable;
