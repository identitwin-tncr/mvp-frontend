import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentLayout from "../../components/layout/ContentLayout";
import MonitoringVariablesTable from "./components/tables/MonitoringVariablesTable";
import { getMonitoringVariablesRequest } from "../../api/catalogRequests";
import SingleButtonHeader from "../../components/header/SimpleButtonHeader";
import Paginator from "../../components/general/Paginator";
import { Box, Link, Breadcrumbs } from "@mui/material";

const VariablesCatalog = () => {
    const [variables, setVariables] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, hasNext: false });
    const resultsPerPage = 5;

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("paginaVariables")) || 1;

    const data = [
        {
            id: 1,
            variable: "Temperatura",
            codigo: "Var_Te",
            unidad: "C",
        },
        {
            id: 2,
            variable: "Luz",
            codigo: "Var_Lu",
            unidad: "Luxes",
        },
        {
            id: 3,
            variable: "Particulas de CO2",
            codigo: "Var_CO2",
            unidad: "ppm",
        },
        {
            id: 4,
            variable: "Humedad",
            codigo: "Var_Hu",
            unidad: "%",
        },
    ];

    const fetchVariables = (page) => {
        const offset = (page - 1) * resultsPerPage;
        getMonitoringVariablesRequest(offset, resultsPerPage)
            .then((response) => {
                setVariables(response.items);
                setPagination({ page, hasNext: response.hasNext });
            })
            .catch((err) => console.log("Error obteniendo variables de monitoreo: ", err))
    };

    useEffect(() => {
        fetchVariables(currentPage);
        console.log("Variables:", variables);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchParams, paginaVariables: newPage });
    };

    return (
        <ContentLayout>
            <Box>
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2, color: "#9F9F9F" }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{ cursor: "pointer" }}
                    >
                        Configuración
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{ cursor: "pointer", color: "black" }}
                    >
                        Variables de monitoreo
                    </Link>
                </Breadcrumbs>
            </Box>
            <SingleButtonHeader
                buttonLabel={"Agregar Variable"}
                buttonOnClickHandler={() => navigate("/configuracion/variables/crear")}
                title={"Variables de Monitoreo"}
            />
            <MonitoringVariablesTable items={data} />
            <Paginator
                page={currentPage}
                onPageChangeHandler={handlePageChange}
                isThereNextResultsPage={pagination.hasNext}
            />
        </ContentLayout>
    );
};

export default VariablesCatalog;