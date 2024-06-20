
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentLayout from '../../components/layout/ContentLayout';
import { Box, Typography, useMediaQuery, CircularProgress, Accordion, AccordionSummary, AccordionDetails, TableHead, TableRow, TableCell, List, ListItemText, Divider, Table, TableBody } from '@mui/material';
import { getAlarmElementsRequest, getAlarmRequest } from '../../api/alarmRequests';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

const AlarmDetail = () => {
  const params = useParams();
  const [alarm, setAlarm] = useState(null);
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getAlarmRequest(params.id)
      .then((response) => {
        setAlarm(response);
      })
      .catch((err) => {
        console.error(err);
    });

    getAlarmElementsRequest(params.id)
    .then((response) => {
      setElements(response);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <ContentLayout>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </ContentLayout>
    );
  }

  if (!alarm) {
    return (
      <ContentLayout>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h4">No se encontraron datos de la alarma.</Typography>
        </Box>
      </ContentLayout>
    );
  }
  
  const tableHeaders = ["Elemento", "Código", "Unidad técnica", "Orientación", "Punto cardinal"];
  const table2Headers = ["Lesión", "Material", "Rango máximo", "Rango mínimo", "Afectado (T/F)"];

  return (
    <ContentLayout pgap={0}>
        <Box
        display="flex"
        flexDirection={isSmallScreen ? 'column' : 'row'}
        justifyContent="left"
        width="100%"
      	>
			<Box m={1} flexBasis="30%" textAlign="left">
			<Typography variant="h4" fontWeight="bold">
				Detalle de alarma
			</Typography>
			</Box>
			<Box p={2} m={1} flexBasis="40%" textAlign="right">
			<Typography variant="h4" fontWeight="bold">
				Estado
			</Typography>
			</Box>
			<Box
			p={2}
			m={1}
			marginTop={1.5}
			flexBasis="15%"
			textAlign="center"
			>
			<Typography borderRadius={2} variant="h6" fontWeight="bold" bgcolor={alarm.status === "ACTIVE" ? "success.main" : "warning.main"} color="white">
				{alarm.status === "ACTIVE" ? "Activa" : "Revisada"}
			</Typography>
			</Box>
      	</Box>
		<Box
        display="flex"
        flexDirection={isSmallScreen ? 'column' : 'row'}
        justifyContent="left"
        width="100%"
      	>
			<Box m={1} flexBasis="30%" textAlign="left">
				<List>
					<ListItemText primary={alarm.block.value}/>
					<Divider />
					<ListItemText secondary="Bloque"/>
				</List>
			</Box>
			<Box m={1} flexBasis="40%" textAlign="left">
				<List>
				<ListItemText primary={new Date(alarm.from).toLocaleString() + " - " + new Date(alarm.to).toLocaleString()}/>
				<Divider />
				<ListItemText secondary="Rango de fechas"/>
				</List>
			</Box>
		</Box>
		<Box
        display="flex"
        flexDirection={isSmallScreen ? 'column' : 'row'}
        justifyContent="left"
        width="100%"
      	>
			<Box m={1} flexBasis="30%" textAlign="left">
				<List>
					<ListItemText primary={new Date(alarm.raisedDate).toLocaleString()}/>
					<Divider />
					<ListItemText secondary="Fecha de alarma"/>
				</List>
			</Box>
			<Box m={1} flexBasis="40%" textAlign="left">
				<List>
				<ListItemText primary={alarm.variable.value}/>
				<Divider />
				<ListItemText secondary="Variable en riesgo"/>
				</List>
			</Box>
		</Box>
		<Box
        display="flex"
        flexDirection={isSmallScreen ? 'column' : 'row'}
        justifyContent="left"
        width="100%"
      	>
			<Box m={1} flexBasis="30%" textAlign="left">
				<List>
					<ListItemText primary={alarm.instrument}/>
					<Divider />
					<ListItemText secondary="Instrumento asociado"/>
				</List>
			</Box>
			<Box m={1} flexBasis="20%" textAlign="left">
				<List>
				<ListItemText primary={alarm.averageValue}/>
				<Divider />
				<ListItemText secondary="Promedio"/>
				</List>
			</Box>
			<Box m={1} flexBasis="20%" textAlign="left">
				<List>
				<ListItemText primary={alarm.varianceValue}/>
				<Divider />
				<ListItemText secondary="Varianza"/>
				</List>
			</Box>
		</Box>
		<Box
        flexDirection={isSmallScreen ? 'column' : 'row'}
        justifyContent="left"
        width="100%"
		m={1}
		marginBottom={3}
      	>
			<Typography variant="h4" fontWeight="bold">
				Elementos técnicos afectados
			</Typography>
		</Box>
        <Box borderRadius={2} bgcolor="#F1F1F1" gap={4} alignItems="center" marginBottom={1}>
        <Box display="flex" gap={3} alignItems="center" marginBottom={1} marginTop={1} paddingLeft={2} >
            {tableHeaders.map((header, index) => (
                <Typography key={index} sx={{ fontWeight: "bold", flexBasis: index === 0 ? '20%' : '15%' }}>
                    {header}
                </Typography>
            ))}
        </Box>
        {elements.map((element) => (
          <Accordion key={element.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: '8px 16px', margin: '4px 0' }}>
                <Box display="flex" gap={4} alignItems="center" width="100%">
                    <Typography flexBasis="20%" style={{ paddingRight: 16 }}>{element.elementType.value}</Typography>
                    <Typography flexBasis="15%" style={{ paddingRight: 16 }}>{element.code}</Typography>
                    <Typography flexBasis="15%" style={{ paddingRight: 16 }}>{element.elementType.technologicalUnit.value}</Typography>
                    <Typography flexBasis="15%" style={{ paddingRight: 16 }}>{(element.number ? element.number : "--") + " " + (element.orientation.value ? element.orientation.value : "--")}</Typography>
                    <Typography flexBasis="15%" style={{ paddingRight: 16 }}>{(element.cardinalPoint.value) ? element.cardinalPoint.value : "--"}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                  <Table aria-label="simple table">
				  <TableHead bgcolor="#F1F1F1">
					  <TableRow>
						  <TableCell sx={{ fontWeight: "bold" }} align="left">
							  Lesión
						  </TableCell>
						  <TableCell sx={{ fontWeight: "bold" }} align="left">
							  Material
						  </TableCell>
						  <TableCell sx={{ fontWeight: "bold" }} align="left">
							  Rango mínimo
						  </TableCell>
						  <TableCell sx={{ fontWeight: "bold" }} align="left">
							  Rango máximo
						  </TableCell>
						  <TableCell align="left"></TableCell>
					  </TableRow>
				  </TableHead>
				  <TableBody>
                {element.wounds.map((item) => (
						  <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							  <TableCell align="left">{`${item.value}`}</TableCell>
							  <TableCell align="left">{item.material}</TableCell>
							  <TableCell align="left">{item.minRange.value + ((item.minRange.affected)? "- Sobrepasado": "")}</TableCell>
							  <TableCell align="left">{item.maxRange.value + ((item.maxRange.affected)? "- Sobrepasado": "")}</TableCell>
							  <TableCell align="left"></TableCell>
						  </TableRow>
					  ))}
				  </TableBody>
			  </Table>
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
		</Box>
    </ContentLayout>
  );
};

export default AlarmDetail;
