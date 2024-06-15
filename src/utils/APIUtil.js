/**
 * Utilitarian function that GET from the app API.
 * @param {string} path - Request endpoint route.
 * @param {string} query - Optional parameters.
 */
const getFromAPI = async (path, query = "") => {
    const res = await fetch(process.env.REACT_APP_API_URL + path + "?" + query);
    // HTTP error thrower.
    if (!res.ok) throw new Error((await res.json()).error);
    return await res.json();
};

/**
 * Utilitarian function that POST to the app API.
 * @param {string} path - Request endpoint route.
 * @param {Object} body - Request body.
 */
const postToAPI = async (path, body = "") => {
    const res = await fetch(process.env.REACT_APP_API_URL + path, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    });
    // HTTP error thrower.
    if (!res.ok) throw new Error((await res.json()).error);
    try {
        return await res.json();
    } catch (e) {
        return true;
    }
};

/**
 * Utilitarian function that PUT to the app API.
 * @param {string} path - Request endpoint route.
 * @param {Object} body - Request body.
 */
const putToAPI = async (path, body) => {
    const res = await fetch(process.env.REACT_APP_API_URL + path, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    });
    // HTTP error thrower.
    if (!res.ok) throw new Error((await res.json()).error);
};

/**
 * Utilitarian function that DELETE from the app API.
 * @param {string} path - Request endpoint route.
 */
const deleteFromAPI = async (path) => {
    const res = await fetch(process.env.REACT_APP_API_URL + path, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    });
    // HTTP error thrower.
    if (!res.ok) throw new Error((await res.json()).error);
};

export { getFromAPI, postToAPI, putToAPI, deleteFromAPI };
