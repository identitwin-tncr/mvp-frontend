import React, { useState } from "react";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Collapse,
} from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SimpleCatalogTable = ({ items, value1, value2, catalogName }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState({});

    const toggleRow = (material) => {
        setOpen((prevOpen) => ({
            ...prevOpen,
            [material]: !prevOpen[material],
        }));
    };

    return (
        <TableContainer component={Paper} variant="outlined">
            <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#548CA3" }}>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align="left">
                            {value1}
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align="left">
                            {value2}
                        </TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((element) => (
                        <React.Fragment key={element.material}>
                            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => toggleRow(element.material)}
                                    >
                                        {open[element.material] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {element.material}
                                </TableCell>
                                <TableCell>{element.codigo}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => navigate(`/configuracion/materiales/modificar/${element.id}`, { state: { element } })}>
                                        <EditIcon color="primary"></EditIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            {/* Fila colapsable */}
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open[element.material]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Table size="small" aria-label="additional-details">
                                                <TableHead sx={{ backgroundColor: "#296F8C99" }}>
                                                    <TableRow>
                                                        <TableCell sx={{ color: "white", fontWeight: "bold", paddingTop: 1, paddingBottom: 1 }}>
                                                            Variable de Monitoreo
                                                        </TableCell>
                                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                                            Unidad
                                                        </TableCell>
                                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                                            Rango Mínimo
                                                        </TableCell>
                                                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                                            Rango Máximo
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {element.variables.map((variable, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell sx={{ padding: 2 }}>{variable.nombre}</TableCell>
                                                            <TableCell>{variable.unidad}</TableCell>
                                                            <TableCell>{variable.rangoMinimo}</TableCell>
                                                            <TableCell>{variable.rangoMaximo}</TableCell>
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

SimpleCatalogTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.Object),
    catalogName: PropTypes.string
};

export default SimpleCatalogTable;
