import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import logoImage from "../../../logo.png";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <Stack
            component={Button}
            onClick={() => navigate("/")}
            direction="row"
            gap={1}
            disableRipple
            sx={{
                textAlign: "left",
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "#fff",
                },
                padding: 0,
            }}
        >
            <img 
                src={logoImage} 
                alt="Logo"
                style={{
                    width: 'auto',
                    height: '50%',
                }}
            />
        </Stack>
    );
};

export default Logo;
