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
import Login from "scenes/auth/Login/index";
import Signup from "scenes/auth/Singup/index";

import Events from "scenes/treePlantation/Events";
import Reports from "scenes/treePlantation/Reports";
import Location from "scenes/treePlantation/Location";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = localStorage.getItem("token");

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            {user && (
              <Route path="/" exact element={<Layout />}>
                {" "}
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Route>
            )}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/" element={<Navigate replace to="/login" />} />
            {user && (
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Tree_Plantation" element={<TreePlantation />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/Donors" element={<Donors />} />
                <Route path="/RO_Plants" element={<RoPlants />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/Events" element={<Events />} />
                <Route path="/Reports" element={<Reports />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Location" element={<Location />} />
              </Route>
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
