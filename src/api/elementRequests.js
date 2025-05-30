import { deleteFromAPI, getFromAPI, postToAPI, putToAPI } from "../utils/APIUtil";


const getElementsRequest = async (offset, limit,blockId,technologicalUnitId) => {
    let queryParams = []
    if(offset !== undefined) queryParams.push(`offset=${offset}`)
    if(limit !== undefined) queryParams.push(`limit=${limit}`)
    if(blockId !== undefined) queryParams.push(`blockId=${blockId}`)
    if(technologicalUnitId !== undefined) queryParams.push(`technologicalUnitId=${technologicalUnitId}`)
    const query = queryParams.join("&")
    return await getFromAPI("/elements", query);
}

export {
    getElementsRequest
}