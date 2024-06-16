import { deleteFromAPI, getFromAPI, postToAPI, putToAPI } from "../utils/APIUtil";

const getMaterialsRequest = async (offset, limit) => {
    const query = offset !== undefined && limit !== undefined? 
                `offset=${offset}&limit=${limit}`
                : "";
    return await getFromAPI("/catalog/materials", query);
}

const getMonitoringVariablesRequest = async (offset, limit) => {
    const query = offset !== undefined && limit !== undefined? 
                `offset=${offset}&limit=${limit}`
                : "";
    return await getFromAPI("/catalog/monitoring-variables", query);
}

export {
    getMaterialsRequest,
    getMonitoringVariablesRequest
}
