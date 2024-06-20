import { deleteFromAPI, getFromAPI, postToAPI, putToAPI } from "../utils/APIUtil";

const getMaterialsRequest = async (offset, limit) => {
    const query = offset !== undefined && limit !== undefined? 
                `offset=${offset}&limit=${limit}`
                : "";
    return await getFromAPI("/catalog/materials", query);
}

const getBlocksRequest = async (offset, limit) => {
    const query = offset !== undefined && limit !== undefined? 
                `offset=${offset}&limit=${limit}`
                : "";
    return await getFromAPI("/catalog/blocks", query);
}

const getMonitoringVariablesRequest = async (offset, limit) => {
    const query = offset !== undefined && limit !== undefined? 
                `offset=${offset}&limit=${limit}`
                : "";
    return await getFromAPI("/catalog/monitoring-variables", query);
}

const getAlarmStatusRequest = async (offset, limit) => {
    const query = offset !== undefined && limit !== undefined? 
                `offset=${offset}&limit=${limit}`
                : "";
    return await getFromAPI("/catalog/alarm-status", query);
}

const getTechUnitsRequest = async (offset, limit) => {
    const query = offset !== undefined && limit !== undefined? 
                `offset=${offset}&limit=${limit}`
                : "";
    return await getFromAPI("/catalog/technical-units", query);
}


export {
    getMaterialsRequest,
    getMonitoringVariablesRequest,
    getAlarmStatusRequest,
    getBlocksRequest,
    getTechUnitsRequest
}
