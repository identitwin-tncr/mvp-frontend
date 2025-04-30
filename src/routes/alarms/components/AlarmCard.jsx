import React from "react";
import { Card, CardContent, Typography, Grid, Icon } from "@mui/material";
import { FaTemperatureHigh, FaCheck, FaExclamationTriangle, FaLeaf } from "react-icons/fa";

const AlarmCard = ({ data }) => {
    const icons = [FaTemperatureHigh, FaCheck, FaExclamationTriangle, FaLeaf];
    const titles = [
        "Alarmas activas (Temperatura)",
        "Alarmas revisadas (Temperatura)",
        "Alarmas activas (Totalidad)",
        "Alarmas revisadas (Totalidad)",
    ];
    const values = [
        data.activeTemperature,
        data.reviewedTemperature,
        data.activeTotal,
        data.reviewedTotal,
    ];

    return (
        <Grid container spacing={2}>
            {titles.map((title, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card>
                        <CardContent>
                            <Icon component={icons[index]} style={{ fontSize: 40, color: "#1976d2" }} />
                            <Typography variant="h6" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h4" color="primary">
                                {values[index]}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default AlarmCard;