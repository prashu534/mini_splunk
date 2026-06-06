import React from "react";

import Sidebar from "../components/Sidebar";

function ClientWebsite() {

  return (

    <div
      style={{
        display: "flex",
        background: "#f3f4f6"
      }}
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div
        style={{

          marginLeft: "270px",

          width: "100%",

          height: "100vh"

        }}
      >

        {/* HEADER */}

        <div
          style={{

            background: "#111827",

            color: "white",

            padding: "20px"

          }}
        >

          <h1>

            Client Website Monitor

          </h1>

        </div>

        {/* CLIENT WEBSITE */}

        <iframe

          src="http://localhost/client_website"

          title="Client Website"

          style={{

            width: "100%",

            height: "90vh",

            border: "none",

            background: "white"

          }}

        />

      </div>

    </div>

  );

}

export default ClientWebsite;