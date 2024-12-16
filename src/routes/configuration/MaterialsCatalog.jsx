import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentLayout from "../../components/layout/ContentLayout";
import SimpleCatalogTable from "./components/tables/SimpleCatalogTable";
import { getMaterialsRequest } from "../../api/catalogRequests";
import SingleButtonHeader from "../../components/header/SimpleButtonHeader";
import Paginator from "../../components/general/Paginator";

const MaterialsCatalog = () => {
    const [materials, setMaterials] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, hasNext: false });
    const resultsPerPage = 5;

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("paginaMateriales")) || 1;

    const data = [
        {
            material: "Oro",
            codigo: "Ma_Or",
            variables: [
                { nombre: "Temperatura", unidad: "°C", rangoMinimo: -10, rangoMaximo: 45 },
                { nombre: "Luxes", unidad: "Luxes", rangoMinimo: 0, rangoMaximo: 1000 },
                { nombre: "Partículas de CO2", unidad: "ppm", rangoMinimo: 0, rangoMaximo: 900 },
                { nombre: "Humedad", unidad: "%", rangoMinimo: 0, rangoMaximo: 70 },
            ],
        },
        { material: "Plata", codigo: "Ma_Plat", variables: [] },
        { material: "Madera", codigo: "Ma_Ma", variables: [] },
        { material: "Acero", codigo: "Ma_Ac", variables: [] },
        { material: "Yeso", codigo: "Ma_Ye", variables: [] },
    ];

    const fetchMaterials = (page) => {
        const offset = (page - 1) * resultsPerPage;
        getMaterialsRequest(offset, resultsPerPage)
            .then((response) => {
                setMaterials(response.items);
                setPagination({ page, hasNext: response.hasNext });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchMaterials(currentPage);
        console.log("Materiales:", materials);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchParams, paginaMateriales: newPage });
    };

    return (
        <ContentLayout>
            <SingleButtonHeader
                buttonLabel={"Agregar material"}
                buttonOnClickHandler={() => navigate("/configuracion/materiales/crear")}
                title={"Materiales"}
            />
            <SimpleCatalogTable items={data} value1={"Material"} value2={"Código"} />
            <Paginator
                page={currentPage}
                onPageChangeHandler={handlePageChange}
                isThereNextResultsPage={pagination.hasNext}
            />
        </ContentLayout>
    );
};

export default MaterialsCatalog;