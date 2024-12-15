import React from 'react';
import {
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableContainer,
    Typography,
    Paper,
    TableBody,
    Alert,
    Box,
} from "@mui/material";

const AfectedElementsTable = ({ data }) => {
    return (
        <TableContainer component={Paper} variant='outlined' sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table aria-label="Afected Elements Table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#548CA3" }}>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Material
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Rango Mínimo
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">
                            Rango Máximo
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((element) => (
                        <TableRow
                            key={element.id}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                        >
                            <TableCell align='center'>
                                <Typography variant='body2'>{element.name}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant='body2'>{element.rangoMinimo}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Box display="flex" alignItems="center" justifyContent="Center" sx={{ gap: 1 }}>
                                    <Typography variant='body2'>{element.rangoMaximo}</Typography>
                                    {element.sobrepasado && (
                                        <Alert
                                            severity="error"
                                            sx={{
                                                fontWeight: "bold",
                                                padding: "0.1rem 0.3rem",
                                                borderRadius: "16px",
                                                fontSize: "0.9rem",
                                                display: "inline-flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            Sobrepasado
                                        </Alert>
                                    )}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AfectedElementsTable;