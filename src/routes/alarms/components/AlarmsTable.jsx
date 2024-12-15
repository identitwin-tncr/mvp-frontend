import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Typography,
    Alert,
} from "@mui/material";
import PropTypes from "prop-types";
import { MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AlarmsTable = ({ items }) => {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table aria-label="alarm table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#548CA3"}}>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            ID
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Bloque
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Instrumento
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Fecha
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Hora
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Estado
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                        >
                            <TableCell align="center">
                                <Typography variant="body2" fontWeight="bold">
                                    #{item.id}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body2">{item.block.value}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body2">{item.instrument}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body2">{item.raisedDate.split("T")[0]}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body2">{item.raisedDate.split("T")[1]}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Alert
                                    severity={item.status === "ACTIVE" ? "warning" : "info"}
                                    sx={{
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "0.01rem 0.5rem",
						                borderRadius: "30px",
						                fontSize: "0.9rem"
                                    }}
                                >
                                    {item.status === "ACTIVE" ? "Activa" : "Revisada"}
                                </Alert>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => navigate("/alarmas/" + item.id)}>
                                    <MoreVert color="primary" />
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
