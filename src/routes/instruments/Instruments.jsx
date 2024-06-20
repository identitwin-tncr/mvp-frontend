import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ContentLayout from "../../components/layout/ContentLayout";
import InstrumentsTable from "./components/InstrumentsTable";
import SingleButtonHeader from "../../components/header/SimpleButtonHeader";
import Paginator from "../../components/general/Paginator";
import SelectItem from "../../components/input/SelectInput";
import { getInstrumentsRequest } from "../../api/instrumentRequests";
import { getBlocksRequest } from "../../api/catalogRequests";
import { useNavigate } from "react-router-dom";

const Instruments = () => {
    const [instruments, setInstruments] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState('');
    const [instrumentsPagination, setInstrumentsPagination] = useState({ page: 1, hasNext: false });
    const resultsPerPage = 6;

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let currentInstrumentsPage = parseInt(searchParams.get("paginaInstrumentos")) || 1;

    const fetchInstruments = (page, blockId) => {
        const offset = (page - 1) * resultsPerPage;
        getInstrumentsRequest(offset, resultsPerPage, blockId)
            .then((response) => {
                setInstruments(response.items);
                setInstrumentsPagination({ page, hasNext: response.hasNext });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        currentInstrumentsPage = 1;
        setSearchParams({ ...searchParams, paginaInstrumentos: currentInstrumentsPage });

        fetchInstruments(currentInstrumentsPage, selectedBlock);
    }, [selectedBlock]);

    useEffect(() => {
        getBlocksRequest()
            .then((response) => {
                const blocksData = response.items.map(item => ({
                    value: item.id,
                    label: item.value
                }));
                setBlocks([{ value: '', label: 'Todos los bloques' }, ...blocksData]);
            })
            .catch(err => console.log(err));
    }, []);

    const handleInstrumentsPageChange = (newPage) => {
        currentInstrumentsPage = newPage;
        setSearchParams({ ...searchParams, paginaInstrumentos: newPage });

        fetchInstruments(newPage, selectedBlock);
    };

    return (
        <ContentLayout>
            <SingleButtonHeader 
                buttonLabel={"Agregar instrumento"} 
                buttonOnClickHandler={() => navigate("/instrumentos/crear")} 
                title={"Instrumentos de medición"} 
            />
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', width:'45%' }}>
                <SelectItem
                    label="Bloque"
                    items={blocks}
                    selectedItem={selectedBlock}
                    onChange={setSelectedBlock}
                />
            </div>
            <InstrumentsTable items={instruments} />
            <Paginator
                page={currentInstrumentsPage}
                onPageChangeHandler={handleInstrumentsPageChange}
                isThereNextResultsPage={instrumentsPagination.hasNext}
            />
        </ContentLayout>
    );
};

export default Instruments;
