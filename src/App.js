import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalProvider} from "./context/Provider";
import {Dashboard} from "./routes/dashboard";
<<<<<<< HEAD
import {CreateElement, ElementDetail, Elements, ModifyElement} from "./routes/elements";
=======
import {ElementDetail, Elements, ModifyElement} from "./routes/elements";
>>>>>>> 8bdb0ad04a0ec7fd8c9b14e8757c0314c8800cbd
import {AlarmDetail, Alarms} from './routes/alarms'
import RouteWrapper from "./routes/RouteWrapper";
import {Instruments} from "./routes/instruments";
import {Catalog, CreateCatalog} from "./routes/configuration";
import CreateInstrument from "./routes/instruments/CreateInstrument";

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
						<Route path={"/elementos/agregar"} element={<CreateElement />} />
						<Route path={"/alarmas"} element={<Alarms />} />
						<Route path={"/alarmas/:id"} element={<AlarmDetail />}/>
						<Route path={"/instrumentos"} element={<Instruments/>} />
						<Route path={"/instrumentos/crear"} element={<CreateInstrument/>} />
						<Route path={"/configuracion"} element={<Catalog/>} />
						<Route path={"/configuracion/bloques/crear"} element={<CreateCatalog catalogName={"bloque"}/>} />
						<Route path={"/configuracion/materiales/crear"} element={<CreateCatalog catalogName={"material"}/>} />
						<Route path={"/configuracion/variables/crear"} element={<CreateCatalog catalogName={"variable de monitoreo"}/>} />
					</Route>
				</Routes>
			</GlobalProvider>
		</BrowserRouter>
    );
}

export default App;
