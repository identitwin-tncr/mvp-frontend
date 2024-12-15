import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalProvider} from "./context/Provider";
import {Dashboard} from "./routes/dashboard";
import {CreateElement, ElementDetail, Elements, ModifyElement} from "./routes/elements";
import {AlarmDetail, Alarms, AlarmTecnicalDetails} from './routes/alarms'
import RouteWrapper from "./routes/RouteWrapper";
import {Instruments, ModifyInstrument} from "./routes/instruments";
import {Catalog, CreateCatalog, ModifyDeleteCatalog} from "./routes/configuration";
import CreateInstrument from "./routes/instruments/CreateInstrument";
import { element } from "prop-types";

function App() {
    return (
		<BrowserRouter>
			<GlobalProvider>
				<Routes>
					<Route element={<RouteWrapper/>}>
						<Route path={"/"} element={<Dashboard/> } />
						<Route path={"/elementos"} element={<Elements/> } />
						<Route path={"/elementos/:id"} element={<ElementDetail />} />
						<Route path={"/elementos/modificar/:id"} element={<ModifyElement/>} />
						<Route path={"/elementos/crear"} element={<CreateElement />} />
						<Route path={"/alarmas"} element={<Alarms />} />
						<Route path={"/alarmas/:id"} element={<AlarmDetail />}/>
						<Route path={"/alarmas/:id/tecnicalDetails"} element={<AlarmTecnicalDetails />}/>
						<Route path={"/instrumentos"} element={<Instruments/>} />
						<Route path={"/instrumentos/crear"} element={<CreateInstrument/>} />
						<Route path={"/instrumentos/modificar/:id"} element={<ModifyInstrument/>} />
						<Route path={"/configuracion"} element={<Catalog/>} />
						<Route path={"/configuracion/bloques/crear"} element={<CreateCatalog catalogName={"bloque"}/>} />
						<Route path={"/configuracion/bloques/modificar/:id"} element={<ModifyDeleteCatalog catalogName={"bloque"}/>} />
						<Route path={"/configuracion/materiales/crear"} element={<CreateCatalog catalogName={"material"}/>} />
						<Route path={"/configuracion/materiales/modificar/:id"} element={<ModifyDeleteCatalog catalogName={"material"}/>} />
						<Route path={"/configuracion/variables/crear"} element={<CreateCatalog catalogName={"variable de monitoreo"}/>} />
						<Route path={"/configuracion/variables/modificar/:id"} element={<ModifyDeleteCatalog catalogName={"variable de monitoreo"}/>} />

					</Route>
				</Routes>
			</GlobalProvider>
		</BrowserRouter>
    );
}

export default App;
