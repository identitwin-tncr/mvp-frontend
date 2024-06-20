import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentLayout from "../../components/layout/ContentLayout";
import SimpleCatalogTable from "./components/tables/SimpleCatalogTable";
import { getMaterialsRequest, getMonitoringVariablesRequest } from "../../api/catalogRequests";
import SingleButtonHeader from "../../components/header/SimpleButtonHeader";
import Paginator from "../../components/general/Paginator";

const Catalog = () => {
    const [materials, setMaterials] = useState([]);
    const [monitoringVariables, setMonitoringVariables] = useState([]);
    const [materialsPagination, setMaterialsPagination] = useState({ page: 1, hasNext: false });
    const [variablesPagination, setVariablesPagination] = useState({ page: 1, hasNext: false });
    const resultsPerPage = 5;
    
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentMaterialsPage = parseInt(searchParams.get("paginaMateriales")) || 1;
    const currentVariablesPage = parseInt(searchParams.get("paginaVariables")) || 1;

    const fetchMaterials = (page) => {
        const offset = (page - 1) * resultsPerPage;
        getMaterialsRequest(offset, resultsPerPage)
            .then((response) => {
                setMaterials(response.items);
                setMaterialsPagination({ page, hasNext: response.hasNext });
            })
            .catch((err) => console.log(err));
    };

    const fetchMonitoringVariables = (page) => {
        const offset = (page - 1) * resultsPerPage;
        getMonitoringVariablesRequest(offset, resultsPerPage)
            .then((response) => {
                setMonitoringVariables(response.items);
                setVariablesPagination({ page, hasNext: response.hasNext });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchMaterials(currentMaterialsPage);
    }, [currentMaterialsPage]);

    useEffect(() => {
        fetchMonitoringVariables(currentVariablesPage);
    }, [currentVariablesPage]);

    const handleMaterialsPageChange = (newPage) => {
        setSearchParams({ ...searchParams, paginaMateriales: newPage });
    };

    const handleVariablesPageChange = (newPage) => {
        setSearchParams({ ...searchParams, paginaVariables: newPage });
    };

    return (
        <ContentLayout>
            <SingleButtonHeader
                buttonLabel={"Agregar material"}
                buttonOnClickHandler={() => navigate("/configuracion/materiales/crear")}
                title={"Materiales"}
            />
            <SimpleCatalogTable items={materials} value1={"Material"} value2={"Código"} />
            <Paginator
                page={currentMaterialsPage}
                onPageChangeHandler={handleMaterialsPageChange}
                isThereNextResultsPage={materialsPagination.hasNext}
            />

            <SingleButtonHeader
                buttonLabel={"Agregar variable"}
                buttonOnClickHandler={() => navigate("/configuracion/variables/crear")}
                title={"Variables de monitoreo"}
            />
            <SimpleCatalogTable items={monitoringVariables} value1={"Variable de monitoreo"} value2={"Siglas"} />
            <Paginator
                page={currentVariablesPage}
                onPageChangeHandler={handleVariablesPageChange}
                isThereNextResultsPage={variablesPagination.hasNext}
            />
        </ContentLayout>
    );
};

export default Catalog;
