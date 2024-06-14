import { createTheme } from "@mui/material/styles";

// MUI theme definition.
const theme = createTheme({
    palette: {
        primary: {
            main: "#DAA520",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#EF3340",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f1f1f1",
        },
    },
});
export default theme;
