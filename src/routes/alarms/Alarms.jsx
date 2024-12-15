import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ContentLayout from "../../components/layout/ContentLayout";
import AlarmsTable from "./components/AlarmsTable";
import SimpleHeader from "../../components/header/SimpleHeader";
import Paginator from "../../components/general/Paginator";
import SelectItem from "../../components/input/SelectInput";
import { getAlarmsRequest } from "../../api/alarmRequests";
import { getBlocksRequest, getMonitoringVariablesRequest } from "../../api/catalogRequests";
import { Box, Container, Typography, InputLabel, FormControl, MenuItem, Select } from "@mui/material";
import AlarmCard from "./components/AlarmCard";
import VariableChart from "./components/VariableChart";
import { useNavigate } from "react-router-dom";
import { color } from "chart.js/helpers";

const Alarms = () => {
    const [alarms, setAlarms] = useState([]);
    const [monitoringVariables, setMonitoringVariables] = useState([]);
    const [alarmBlock, setAlarmBlock] = useState([]);
    const [selectedVariable, setSelectedVariable] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('');
    const [alarmsPagination, setAlarmsPagination] = useState({ page: 1, hasNext: false });
    const resultsPerPage = 6;
    const sampleCardData = {
        activeTemperature: 4,
        reviewedTemperature: 6,
        activeTotal: 12,
        reviewedTotal: 14,
    };

    const sampleChartData = {
        dates: ["21/06", "22/06", "23/06", "24/06", "25/06", "26/06", "27/06"],
        maxValues: [30, 32, 33, 31, 30, 34, 33],
        minValues: [10, 12, 11, 13, 12, 11, 12],
    };

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let currentAlarmsPage = parseInt(searchParams.get("paginaAlarmas")) || 1;

    const fetchAlarms = (page, variableId, blockId) => {
        const offset = (page - 1) * resultsPerPage;
        getAlarmsRequest(offset, resultsPerPage, variableId, blockId)
            .then((response) => {
                setAlarms(response.items);
                setAlarmsPagination({ page, hasNext: response.hasNext });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        currentAlarmsPage = 1;
        setSearchParams({ ...searchParams, paginaAlarmas: currentAlarmsPage });

        fetchAlarms(currentAlarmsPage, selectedVariable, selectedBlock);
    }, [selectedVariable, selectedBlock]);

    useEffect(() => {
        getMonitoringVariablesRequest()
            .then((response) => {
                const variables = response.items.map(item => ({
                    value: item.id,
                    label: item.value
                }));
                setMonitoringVariables([{ value: '', label: 'Todas las variables' }, ...variables]);
            })
            .catch(err => console.log(err));

        getBlocksRequest()
            .then((response) => {
                const blocks = response.items.map(item => ({
                    value: item.id,
                    label: item.value
                }));
                setAlarmBlock([{ value: '', label: 'Todos los bloques' }, ...blocks]);
            })
            .catch(err => console.log(err));
    }, []);

    const handleAlarmsPageChange = (newPage) => {
        currentAlarmsPage = newPage;
        setSearchParams({ ...searchParams, paginaAlarmas: newPage });

        fetchAlarms(newPage, selectedVariable, selectedBlock);
    };

    return (
        <Container>
            <Box>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#9F9F9F",
                        marginBottom: 1,
                    }}
                >
                    Alarmas
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        color: "#143846", 
                        fontSize: "2.5rem",
                        fontWeight: 700, 
                    }}
                >
                    Alarmas
                </Typography>
            </Box>
            <Typography
                variant="h7"
                sx={{
                    color: "#898989",
                    fontWeight: 400,
                }}
            >
                Variable
            </Typography>
            <FormControl fullWidth variant="standard" sx={{ marginBottom: "2rem", marginTop: "2rem" }}>
                <InputLabel id="variable-select-label">Seleccionar Variable</InputLabel>
                <Select
                    labelId="variable-select-label"
                    id="variable-select"
                    defaultValue=""
                >
                    <MenuItem value="Temperatura">Temperatura</MenuItem>
                    <MenuItem value="Humedad">Humedad</MenuItem>
                    <MenuItem value="Luz">Luz</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ mb: 4 }}>
                <AlarmCard data={sampleCardData} />
            </Box>
            <Box sx={{ mb: 4 }}>
                <VariableChart data={sampleChartData} />
            </Box>
            <div style={{ marginTop: "2rem" }}>
                <AlarmsTable items={alarms} />
                <Paginator
                    page={currentAlarmsPage}
                    onPageChangeHandler={handleAlarmsPageChange}
                    isThereNextResultsPage={alarmsPagination.hasNext}
                />
            </div>
        </Container>
    );
};

export default Alarms;
