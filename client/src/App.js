import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import TreePlantation from "scenes/treePlantation";
import Inventory from "scenes/inventory";
import Donors from "scenes/donors";
import RoPlants from "scenes/ROPlants";
import Admin from "scenes/admin";

import React from "react";
import MainContent from "scenes/inventory/MainContent";
import AddItems from "scenes/inventory/AddItems";
import ReleaseItems from "scenes/inventory/ReleaseItems";
import CreateEvent from "scenes/inventory/CreateEvent";
//import GenerateReport from "scenes/inventory/GenerateReport";

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
              <Route path="/Tree Plantation" element={<TreePlantation />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route path="/Donors" element={<Donors />} />
              <Route path="/RO Plants" element={<RoPlants />} />
              <Route path="/admin" element={<Admin />} />

              <Route path="/inventory/MainContent" element={<MainContent />} />
              <Route path="/inventory/AddItems" element={<AddItems />} />
              <Route
                path="/inventory/ReleaseItems"
                element={<ReleaseItems />}
              />
              <Route path="/inventory/CreateEvent" element={<CreateEvent />} />

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
