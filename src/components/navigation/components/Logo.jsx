import {useNavigate} from "react-router-dom";
import {Button, Stack, Typography} from "@mui/material";

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
            }}
        >
            <Typography variant="h3" fontWeight="bold" color="primary.main">
                TNCR
            </Typography>
        </Stack>
    );
};

export default Logo;
