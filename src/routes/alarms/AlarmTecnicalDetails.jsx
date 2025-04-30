import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '../../components/layout/ContentLayout';
import AfectedTecnicalElementsTable from './components/AfectedTecnicalElementsTable';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Card,
    Button,
    IconButton,
    Breadcrumbs,
    Link,
} from '@mui/material';
import { getAlarmElementsRequest, getAlarmRequest } from '../../api/alarmRequests';

const AlarmTecnicalDetails = () => {
    const { id } = useParams();
    const [alarm, setAlarm] = useState(null);
    const [elements, setElements] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const data = [
        {
            "id": 1,
            "name": "Muro",
            "code": "1-2BA_Ev_Mu_S",
            "unit": "Fundaciones",
            "orientation": "--",
            "cardinalPoint": "Sur",
            "lesions": [
                {
                    "type": "Fisuras",
                    "material": "Cerámica",
                    "range_min": "0 Luxes",
                    "range_max": "900 Luxes",
                    "sobrepasado": true
                },
                {
                    "type": "Grietas",
                    "material": "Cerámica",
                    "range_min": "0 Luxes",
                    "range_max": "900 Luxes",
                    "sobrepasado": true
                },
                {
                    "type": "Losa",
                    "material": "Cerámica",
                    "range_min": "0 Luxes",
                    "range_max": "900 Luxes",
                    "sobrepasado": true
                },
            ],
        },
        {
            "id": 2,
            "name": "Losa",
            "code": "1BA_Ch_Lo",
            "unit": "Fundaciones",
            "orientation": "--",
            "cardinalPoint": "Sur",
            "lesions": [],
        },
        {
            "id": 3,
            "name": "Cimiento corrido",
            "code": "1BA_Fu_CiC_O",
            "unit": "Fundaciones",
            "orientation": "--",
            "cardinalPoint": "Sur",
            "lesions": [],
        },
    ];

    useEffect(() => {
        Promise.all([getAlarmRequest(id), getAlarmElementsRequest(id)])
            .then(([alarmData, elementsData]) => {
                setAlarm(alarmData);
                setElements(elementsData);
                setLoading(false);

                console.log("Alarm data received:", alarmData);
                console.log("Elements data received:", elementsData);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <ContentLayout>
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            </ContentLayout>
        );
    }

    if (!alarm || !elements) {
        return (
            <ContentLayout>
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h4">No se encontraron datos de la alarma.</Typography>
                </Box>
            </ContentLayout>
        );
    }

    return (
        <ContentLayout>
            <Box>
                {/* Breadcrumbs para navegación */}
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2, color: "#9F9F9F" }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate("/alarmas")} // Redirige a la lista de alarmas
                        sx={{ cursor: "pointer" }}
                    >
                        Alarmas
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/alarmas/${alarm.id}`)} // Redirige a los detalles de la alarma
                    >
                        #{alarm.id}
                    </Link>
                    <Typography color="text.primary">Detalles Técnicos</Typography>
                </Breadcrumbs>

                {/* Título principal con botón de regreso */}
                <Box display="flex" alignItems="center" mb={4}>
                    <IconButton
                        onClick={() => navigate(-1)} // Redirige a la página anterior
                        sx={{
                            marginRight: 2,
                            color: "#143846",
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            marginRight: 2,
                            color: "#143846",
                        }}
                    >
                        Alarma #{alarm.id}
                    </Typography>
                    <Alert
                        severity={alarm.status === "ACTIVE" ? "warning" : "info"}
                        sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "0.01rem 0.5rem",
                            borderRadius: "30px",
                            fontSize: "0.9rem",
                        }}
                    >
                        {alarm.status === "ACTIVE" ? "Activa" : "Revisada"}
                    </Alert>
                </Box>
            </Box>
            <Box display="flex" alignItems="flex-start" gap={2}>
                {/* Detalles principales */}
                <Box display="flex" gap={4} flexWrap="wrap" mb={4}>
                    <Box>
                        <Typography variant="body2" color="#9F9F9F">
                            Variable
                        </Typography>
                        <Typography variant="body1">{alarm.variable.value}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="#9F9F9F">
                            Bloque
                        </Typography>
                        <Typography>{alarm.block.value}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="#9F9F9F">
                            Fecha
                        </Typography>
                        <Typography>{new Date(alarm.raisedDate).toLocaleDateString()}</Typography>
                    </Box>
                    <Box sx={{ flexBasis: "100%" }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap={4}>
                        <Box>
                            <Typography variant="body2" color="#9F9F9F">
                                Instrumento
                            </Typography>
                            <Typography>{alarm.instrument}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="#9F9F9F">
                                Hora
                            </Typography>
                            <Typography>
                                {new Date(alarm.raisedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Card
                    variant="outlined"
                    sx={{
                        padding: 2,
                        display: "inline-block",
                        minWidth: "auto",
                    }}
                >
                    <Typography variant="body2" fontWeight="bold" color="#9F9F9F" mb={2}>
                        Detalles técnicos
                    </Typography>
                    <Box display="flex" gap={2} flexWrap="nowrap">
                        <Typography mb={1}>
                            Promedio: <strong>{alarm.averageValue} {alarm.variable.unit}</strong>
                        </Typography>
                        <Typography mb={1}>
                            Varianza: <strong>{alarm.varianceValue} {alarm.variable.unit}</strong>
                        </Typography>
                    </Box>
                    <Box display="flex" gap={2} flexWrap="nowrap">
                        <Typography mb={1}>
                            Valor máximo: <strong>{alarm.maxValue} {alarm.variable.unit}</strong>
                        </Typography>
                        <Typography>
                            Valor mínimo: <strong>{alarm.minValue} {alarm.variable.unit}</strong>
                        </Typography>
                    </Box>
                </Card>
            </Box>
            <Box>
                <Typography variant="h5" fontWeight="bold">Elementos técnicos afectados</Typography>
                <AfectedTecnicalElementsTable data={data} />
            </Box>
        </ContentLayout>
    );
};

export default AlarmTecnicalDetails;