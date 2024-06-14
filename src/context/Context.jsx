import { createContext } from "react";

/**
 * Global state definition.
 */
const GlobalContext = createContext({
    // Custom snackbar component global state.
    snackbarSignal: {
        message: "",
        show: false,
        status: "success",
    },

    // // Custom modal component global state.
    // modalSignal: {
    //     title: "",
    //     body: false,
    //     buttonLabel: "",
    //     buttonClickHandler: () => {},
    //     show: false,
    // },

    // resultsPerPage: 20,
});

export {
    GlobalContext
}