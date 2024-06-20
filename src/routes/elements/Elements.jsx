import React, { useEffect, useState } from "react";
import ContentLayout from "../../components/layout/ContentLayout";
import ElementsTable from "./components/ElementsTable";
import SingleButtonHeader from "../../components/header/SimpleButtonHeader";
import SelectItem from "../../components/input/SelectInput";
import Paginator from "../../components/general/Paginator";
import { getElementsRequest } from "../../api/elementRequests";
import { getBlocksRequest, getTechUnitsRequest } from "../../api/catalogRequests";
import { useNavigate, useSearchParams } from "react-router-dom";

const Elements = () => {
    const [elements, setElements] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [techUnits, setTechUnits] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState('');
    const [selectedTechUnit, setSelectedTechUnit] = useState('');
    const [elementsPagination, setElementsPagination] = useState({ page: 1, hasNext: false });
    const resultsPerPage = 6;

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let currentElementsPage = parseInt(searchParams.get("paginaElementos")) || 1;

    const fetchElements = (page, blockId, techUnitId) => {
        let offset = (page - 1) * resultsPerPage;
        getElementsRequest(offset, resultsPerPage, blockId, techUnitId)
            .then((response) => {
                setElements(response.items);
                setElementsPagination({ page, hasNext: response.hasNext });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getBlocksRequest()
            .then((response) => {
                let blocksData = response.items.map(item => ({
                    value: item.id,
                    label: item.value
                }));
                setBlocks([{ value: '', label: 'Todos los bloques' }, ...blocksData]);
            })
            .catch(err => console.log(err));

        getTechUnitsRequest()
            .then((response) => {
                let techUnitsData = response.items.map(item => ({
                    value: item.id,
                    label: item.value
                }));
                setTechUnits([{ value: '', label: 'Todas las unidades técnicas' }, ...techUnitsData]);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        currentElementsPage = 1;
        setSearchParams({ ...searchParams, paginaElementos: currentElementsPage });

        fetchElements(currentElementsPage, selectedBlock, selectedTechUnit);
    }, [selectedBlock, selectedTechUnit]);

    const handleElementsPageChange = (newPage) => {
        currentElementsPage = newPage;
        setSearchParams({ ...searchParams, paginaElementos: newPage });

        fetchElements(newPage, selectedBlock, selectedTechUnit);
    };

    return (
        <ContentLayout>
            <SingleButtonHeader 
                buttonLabel={"Agregar elemento"} 
                buttonOnClickHandler={() => navigate("/elementos/crear")} 
                title={"Elementos técnicos"} 
            />
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', width:'100%' }}>
                <SelectItem
                    label="Bloque"
                    items={blocks}
                    selectedItem={selectedBlock}
                    onChange={setSelectedBlock}
                />
                <SelectItem
                    label="Unidad tecnológica"
                    items={techUnits}
                    selectedItem={selectedTechUnit}
                    onChange={setSelectedTechUnit}
                />
            </div>
            <ElementsTable items={elements} />
            <Paginator
                page={currentElementsPage}
                onPageChangeHandler={handleElementsPageChange}
                isThereNextResultsPage={elementsPagination.hasNext}
            />
        </ContentLayout>
    );
};

export default Elements;
