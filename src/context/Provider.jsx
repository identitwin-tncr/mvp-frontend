import {useState} from "react";
import {GlobalContext} from "./Context";
import PropTypes from "prop-types";

const GlobalProvider = ({children}) => {
    // Custom snackbar component state holder.
    const [snackbarSignal, setSnackbarSignal] = useState({
        message: "",
        show: false,
        status: "success",
    });
    
    /**
     * Display custom snackbar component.
     * @param {string} message - Feedback message to be displayed.
     * @param {string} status - Status of the message.
     */
    const showSnackbar = (message, status) => {
        setSnackbarSignal({
            message,
            show: true,
            status,
        });
    };

    /**
     * Hide custom snackbar component.
     */
    const hideSnackbar = () => {
        setSnackbarSignal({
            ...snackbarSignal,
            show: false,
        });
    };
    
    return (
        <GlobalContext.Provider
            value={{
                snackbarSignal,
                showSnackbar,
                hideSnackbar
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {
    GlobalProvider
};
