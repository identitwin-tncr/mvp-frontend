import {
    deleteFromAPI,
    getFromAPI,
    postToAPI,
    putToAPI,
} from "../utils/APIUtil";

const getMaterialsRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/materials", query);
};

const getBlocksRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/blocks", query);
};

const getMonitoringVariablesRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/monitoring-variables", query);
};

const getAlarmStatusRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/alarm-status", query);
};

const getTechUnitsRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/technical-units", query);
};

const getOrientationsRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/orientations", query);
};

const getCardinalPointsRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/cardinal-points", query);
};

const getElementTypesRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/element-types", query);
};

const getIntrumentTypesRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/instrument-types", query);
};

const getMonitoringFrequenciesRequest = async (offset, limit) => {
    const query =
        offset !== undefined && limit !== undefined
            ? `offset=${offset}&limit=${limit}`
            : "";
    return await getFromAPI("/catalog/monitoring-frecuencies", query);
};

export {
    getMaterialsRequest,
    getMonitoringVariablesRequest,
    getAlarmStatusRequest,
    getBlocksRequest,
    getTechUnitsRequest,
    getOrientationsRequest,
    getCardinalPointsRequest,
    getElementTypesRequest,
    getIntrumentTypesRequest,
    getMonitoringFrequenciesRequest,
};
