
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '../../components/layout/ContentLayout';
import AfectedElementsTable from './components/AfectedElementsTable';
import {
	Box,
	Typography,
	CircularProgress,
	Alert,
	Card,
	Button,
} from '@mui/material';
import { getAlarmElementsRequest, getAlarmRequest } from '../../api/alarmRequests';

const AlarmDetail = () => {
	const { id } = useParams();
	const [alarm, setAlarm] = useState(null);
	const [elements, setElements] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const data = [
		{id: 1, name: "Ceramica", rangoMinimo: "0 Luxes", rangoMaximo: "900 Luxes", sobrepasado: true},
		{id: 2, name: "Madera", rangoMinimo: "0 Luxes", rangoMaximo: "900 Luxes", sobrepasado: true},
		{id: 3, name: "Metal", rangoMinimo: "0 Luxes", rangoMaximo: "850 Luxes", sobrepasado: false}
	]

	useEffect(() => {
		Promise.all([getAlarmRequest(id), getAlarmElementsRequest(id)])
			.then(([alarmData, elementsData]) => {
				setAlarm(alarmData);
				setElements(elementsData);
				setLoading(false);

				console.log("Alarm data received:", alarmData);
				console.log("Elements data received:", elementsData);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return (
			<ContentLayout>
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<CircularProgress />
				</Box>
			</ContentLayout>
		);
	}

	if (!alarm || !elements) {
		return (
			<ContentLayout>
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<Typography variant="h4">No se encontraron datos de la alarma.</Typography>
				</Box>
			</ContentLayout>
		);
	}

	return (
		<ContentLayout>
			<Box display="flex" alignItems="center" mb={4}>
				<Typography variant="h4" fontWeight="bold" sx={{ marginRight: 2 }}>
					Alarma #{alarm.id}
				</Typography>
				<Alert
					severity={alarm.status === "ACTIVE" ? "warning" : "info"}
					sx={{
						fontWeight: "bold",
						textTransform: "uppercase",
						justifyContent: "center",
						alignItems: "center",
						padding: "0.01rem 0.5rem",
						borderRadius: "30px",
						fontSize: "0.9rem",
					}}
				>
					{alarm.status === "ACTIVE" ? "Activa" : "Revisada"}
				</Alert>
			</Box>
			<Box display="flex" alignItems="flex-start" gap={2}>
				{/* Detalles principales */}
				<Box display="flex" gap={4} flexWrap="wrap" mb={4}>
					<Box>
						<Typography variant="body2" color="#9F9F9F">
							Variable
						</Typography>
						<Typography variant="body1">{alarm.variable.value}</Typography>
					</Box>
					<Box>
						<Typography variant="body2" color="#9F9F9F">
							Bloque
						</Typography>
						<Typography>{alarm.block.value}</Typography>
					</Box>
					<Box>
						<Typography variant="body2" color="#9F9F9F">
							Fecha
						</Typography>
						<Typography>{new Date(alarm.raisedDate).toLocaleDateString()}</Typography>
					</Box>
					<Box sx={{ flexBasis: "100%" }} />
					<Box display="flex" justifyContent="space-between" alignItems="center" gap={4}>
						<Box>
							<Typography variant="body2" color="#9F9F9F">
								Instrumento
							</Typography>
							<Typography>{alarm.instrument}</Typography>
						</Box>
						<Box>
							<Typography variant="body2" color="#9F9F9F">
								Hora
							</Typography>
							<Typography>
								{new Date(alarm.raisedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Card variant="outlined" sx={{ padding: 2, minWidth: 200 }}>
					<Typography variant="body2" fontWeight="bold" color="#9F9F9F" mb={2}>
						Valores de referencia
					</Typography>
					<Typography mb={1}>
						Valor máximo: <strong>{alarm.maxValue} {alarm.variable.unit}</strong>
					</Typography>
					<Typography>
						Valor mínimo: <strong>{alarm.minValue} {alarm.variable.unit}</strong>
					</Typography>
				</Card>
			</Box>
			<Box>
				<Typography variant="h5" fontWeight="bold">Elementos afectados</Typography>
				<AfectedElementsTable data={data}/>
			</Box>
			<Box display="flex" justifyContent="flex-end" alignItems="right">
				<Button
					variant="contained"
					onClick={() => navigate(`/alarmas/${alarm.id}/tecnicalDetails`)}
					sx={{
						backgroundColor: "#143846",
						"&:hover": {
							backgroundColor: "#548CA3",
						},
						borderRadius: "16px",
					}}
				>
					Ver detalles técnicos
				</Button>
			</Box>
		</ContentLayout>
	);
};

export default AlarmDetail;
