import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalProvider} from "./context/Provider";
import {Dashboard} from "./routes/dashboard";
import {ElementDetail, Elements, ModifyElement} from "./routes/elements";
import {AlarmDetail, Alarms} from './routes/alarms'
import RouteWrapper from "./routes/RouteWrapper";
import Instruments from "./routes/instruments/Instruments";
import {Variables} from "./routes/variables";
import { Catalog } from "./routes/configuration";

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
						<Route path={"/alarmas"} element={<Alarms />} />
						<Route path={"/alarmas/detalle/:id"} element={<AlarmDetail />} />
						<Route path={"/instrumentos"} element={<Instruments/>} />
						<Route path={"/variables"} element={<Variables/>} />
						<Route path={"/configuracion"} element={<Catalog/>} />
					</Route>
				</Routes>
			</GlobalProvider>
		</BrowserRouter>
    );
}

export default App;
