import { deleteFromAPI, getFromAPI, postToAPI, putToAPI } from "../utils/APIUtil";


const getInstrumentsRequest = async (offset, limit,blockId,technologicalUnitId) => {
    let queryParams = []
    if(offset !== undefined) queryParams.push(`offset=${offset}`)
    if(limit !== undefined) queryParams.push(`limit=${limit}`)
    if(blockId !== undefined) queryParams.push(`blockId=${blockId}`)
    const query = queryParams.join("&")
    return await getFromAPI("/instruments", query);
}

export {
    getInstrumentsRequest
}