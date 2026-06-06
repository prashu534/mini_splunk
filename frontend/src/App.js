import React from "react";

import {

  BrowserRouter,

  Routes,

  Route,

  Navigate

} from "react-router-dom";

// PAGES

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Logs from "./pages/Logs";

import Settings from "./pages/Settings";

import ClientWebsite from "./pages/ClientWebsite";

import Clients from "./pages/Clients";

// =====================================
// PRIVATE ROUTE
// =====================================

const PrivateRoute = ({ children }) => {

  const isLoggedIn =

    sessionStorage.getItem(

      "loggedIn"

    );

  return isLoggedIn

    ? children

    : <Navigate to="/login" />;

};

// =====================================
// APP
// =====================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route

          path="/login"

          element={<Login />}

        />

        {/* DASHBOARD */}

        <Route

          path="/dashboard"

          element={

            <PrivateRoute>

              <Dashboard />

            </PrivateRoute>

          }

        />

        {/* LOGS */}

        <Route

          path="/logs"

          element={

            <PrivateRoute>

              <Logs />

            </PrivateRoute>

          }

        />

        {/* SETTINGS */}

        <Route

          path="/settings"

          element={

            <PrivateRoute>

              <Settings />

            </PrivateRoute>

          }

        />

        {/* CLIENT WEBSITE */}

        <Route

          path="/client"

          element={

            <PrivateRoute>

              <ClientWebsite />

            </PrivateRoute>

          }

        />

        {/* CLIENTS */}

        <Route

          path="/clients"

          element={

            <PrivateRoute>

              <Clients />

            </PrivateRoute>

          }

        />

        {/* DEFAULT */}

        <Route

          path="*"

          element={

            sessionStorage.getItem(

              "loggedIn"

            )

            ?

            <Navigate to="/dashboard" />

            :

            <Navigate to="/login" />

          }

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;