import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const VariableChart = ({ data }) => {
    const chartData = {
        labels: data.dates,
        datasets: [
            {
                label: "Rango máximo",
                data: data.maxValues,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: true,
            },
            {
                label: "Rango mínimo",
                data: data.minValues,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Comportamiento de variable" },
        },
    };

    return (
        <Card>
            <CardContent>
                <Line data={chartData} options={options} />
            </CardContent>
        </Card>
    );
};

export default VariableChart;
