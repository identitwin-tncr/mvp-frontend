import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
} from "@mui/material";
import PropTypes from "prop-types";

const MonitoringVariablesTable = ({ items }) => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table aria-label="Monitoring Variables Table">
                <TableHead sx={{ backgroundColor: "#548CA3" }}>
                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                            Variable
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                            Código
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                            Unidad de medición
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((element) => (
                        <TableRow
                            key={element.id}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                                "&:hover": { backgroundColor: "#f5f5f5" },
                                marginBottom: "10px",
                                display: "table-row",
                            }}
                        >
                            <TableCell>{element.variable}</TableCell>
                            <TableCell>{element.codigo}</TableCell>
                            <TableCell>{element.unidad}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MonitoringVariablesTable;