import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ContentLayout from "../../components/layout/ContentLayout";
import AlarmsTable from "./components/AlarmsTable";
import SimpleHeader from "../../components/header/SimpleHeader";
import Paginator from "../../components/general/Paginator";
import SelectItem from "../../components/input/SelectInput";
import { getAlarmsRequest } from "../../api/alarmRequests";
import { getBlocksRequest, getMonitoringVariablesRequest } from "../../api/catalogRequests";
import { useNavigate } from "react-router-dom";

const Alarms = () => {
    const [alarms, setAlarms] = useState([]);
    const [monitoringVariables, setMonitoringVariables] = useState([]);
    const [alarmBlock, setAlarmBlock] = useState([]);
    const [selectedVariable, setSelectedVariable] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('');
    const [alarmsPagination, setAlarmsPagination] = useState({ page: 1, hasNext: false });
    const resultsPerPage = 6;

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
        <ContentLayout>
            <SimpleHeader title={"Alarmas"} />
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <SelectItem
                    label="Variable de Monitoreo"
                    items={monitoringVariables}
                    selectedItem={selectedVariable}
                    onChange={setSelectedVariable}
                />
                <SelectItem
                    label="Bloque"
                    items={alarmBlock}
                    selectedItem={selectedBlock}
                    onChange={setSelectedBlock}
                />
            </div>
            <AlarmsTable items={alarms} />
            <Paginator
                page={currentAlarmsPage}
                onPageChangeHandler={handleAlarmsPageChange}
                isThereNextResultsPage={alarmsPagination.hasNext}
            />
        </ContentLayout>
    );
};

export default Alarms;
