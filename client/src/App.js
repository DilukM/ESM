import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import TreePlantation from "scenes/treePlantation/index";
import Inventory from "scenes/inventory";
import Donors from "scenes/donors";
import RoPlants from "scenes/ROPlants";
import Admin from "scenes/admin";
import axios from "axios";

import Events from "scenes/treePlantation/Events";
import Reports from "scenes/treePlantation/Reports";
import Location from "scenes/treePlantation/Location";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Tree_Plantation" element={<TreePlantation />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route path="/Donors" element={<Donors />} />
              <Route path="/RO_Plants" element={<RoPlants />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/Events" element={<Events />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/Location" element={<Location/>}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
