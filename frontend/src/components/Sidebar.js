import React from "react";

function Sidebar() {

  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    sessionStorage.clear();

    window.location.href = "/login";

  };

  return (

    <div
      style={{

        width: "250px",

        height: "100vh",

        background: "#111827",

        color: "white",

        position: "fixed",

        left: 0,

        top: 0,

        padding: "20px",

        overflowY: "auto"

      }}
    >

      {/* TITLE */}

      <h1
        style={{

          marginBottom: "40px",

          fontSize: "28px"

        }}
      >

        Mini Splunk

      </h1>

      {/* DASHBOARD */}

      <button

        onClick={() =>

          window.location.href =
          "/dashboard"

        }

        style={buttonStyle}

      >

        Dashboard

      </button>

      {/* THREAT LOGS */}

      <button

        onClick={() =>

          window.location.href =
          "/logs"

        }

        style={buttonStyle}

      >

        Threat Logs

      </button>

      {/* CLIENTS */}

      <button

        onClick={() =>

          window.location.href =
          "/clients"

        }

        style={buttonStyle}

      >

        Clients

      </button>

      {/* SETTINGS */}

      <button

        onClick={() =>

          window.location.href =
          "/settings"

        }

        style={buttonStyle}

      >

        Settings

      </button>

      {/* LOGOUT */}

      <button

        onClick={logout}

        style={logoutStyle}

      >

        Logout

      </button>

    </div>

  );

}

// =====================================
// BUTTON STYLE
// =====================================

const buttonStyle = {

  width: "100%",

  padding: "14px",

  marginBottom: "15px",

  background: "#1f2937",

  color: "white",

  border: "none",

  borderRadius: "8px",

  textAlign: "left",

  cursor: "pointer",

  fontSize: "16px"

};

// =====================================
// LOGOUT STYLE
// =====================================

const logoutStyle = {

  width: "100%",

  padding: "14px",

  marginTop: "30px",

  background: "crimson",

  color: "white",

  border: "none",

  borderRadius: "8px",

  cursor: "pointer",

  fontSize: "16px"

};

export default Sidebar;