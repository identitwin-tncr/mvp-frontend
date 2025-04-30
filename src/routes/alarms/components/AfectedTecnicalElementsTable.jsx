import React, { useState } from 'react';
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
    Collapse,
    IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const AfectedTecnicalElementsTable = ({ data }) => {
    const [open, setOpen] = useState({});

    const toggleRow = (id) => {
        setOpen((prevOpen) => ({
            ...prevOpen,
            [id]: !prevOpen[id],
        }));
    };

    return (
        <TableContainer component={Paper} variant='outlined' sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: "#548CA3" }}>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Elemento</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Código</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Unidad Técnica</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Orientación</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Punto Cardinal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((element) => (
                        <React.Fragment key={element.id}>
                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => toggleRow(element.id)}
                                    >
                                        {open[element.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope='row'>
                                    {element.name}
                                </TableCell>
                                <TableCell>{element.code}</TableCell>
                                <TableCell>{element.unit}</TableCell>
                                <TableCell>{element.orientation}</TableCell>
                                <TableCell>{element.cardinalPoint}</TableCell>
                            </TableRow>
                            {/* Fila colapsable */}
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open[element.id]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Table size="small" aria-label="additional-details">
                                                <TableHead sx={{ backgroundColor: "#D4E2E8" }}>
                                                    <TableRow>
                                                        <TableCell sx={{ color: "#143846", fontWeight: "bold", paddingTop: 1, paddingBottom: 1 }}>
                                                            Lesión
                                                        </TableCell>
                                                        <TableCell sx={{ color: "#143846", fontWeight: "bold" }}>
                                                            Material
                                                        </TableCell>
                                                        <TableCell sx={{ color: "#143846", fontWeight: "bold" }}>
                                                            Rango Mínimo
                                                        </TableCell>
                                                        <TableCell sx={{ color: "#143846", fontWeight: "bold" }}>
                                                            Rango Máximo
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {element.lesions.map((detail, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell sx={{ padding: 2 }}>{detail.type}</TableCell>
                                                            <TableCell>{detail.material}</TableCell>
                                                            <TableCell>{detail.range_min}</TableCell>
                                                            <TableCell>
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    <Typography sx={{ marginRight: "auto" }}>{detail.range_max}</Typography> {/* Esto empuja el texto a la izquierda */}
                                                                    {detail.sobrepasado && (
                                                                        <Alert
                                                                            severity="error"
                                                                            sx={{
                                                                                fontWeight: "bold",
                                                                                padding: "0.1rem 0.3rem",
                                                                                borderRadius: "16px",
                                                                                fontSize: "0.9rem",
                                                                                display: "inline-flex",
                                                                                alignItems: "center",
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
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AfectedTecnicalElementsTable;