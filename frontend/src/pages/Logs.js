import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Logs() {

  // =====================================
  // STATES
  // =====================================

  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(false);

  // =====================================
  // SHOW ALERTS
  // =====================================

  const showThreatAlert = (

    message,

    level

  ) => {

    if (level === "HIGH") {

      toast.error(

        "🚨 HIGH ALERT: " + message,

        {

          position: "top-right",

          autoClose: 5000

        }

      );

    }

    else if (

      level === "MEDIUM"

    ) {

      toast.warning(

        "⚠️ MEDIUM ALERT: " +

        message,

        {

          position: "top-right",

          autoClose: 4000

        }

      );

    }

  };

  // =====================================
  // FETCH LOGS
  // =====================================

  const fetchLogs = async () => {

    try {

      setLoading(true);

      const response = await axios.get(

        "http://localhost/mini_splunk/backend/logs/fetch_logs.php"

      );

      if (

        Array.isArray(response.data)

      ) {

        setLogs(response.data);

        // SHOW ALERTS

        if (

          response.data.length > 0

        ) {

          const latestLog =
            response.data[0];

          if (

            latestLog.log_level === "HIGH" ||

            latestLog.log_level === "MEDIUM"

          ) {

            showThreatAlert(

              latestLog.log_message,

              latestLog.log_level

            );

          }

        }

      }

      else {

        setLogs([]);

      }

      setLoading(false);

    }

    catch (error) {

      console.log(

        "Fetch Error:",

        error

      );

      setLoading(false);

    }

  };

  // =====================================
  // PAGE LOAD
  // =====================================

  useEffect(() => {

    fetchLogs();

    // AUTO REFRESH

    const interval = setInterval(() => {

      fetchLogs();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  // =====================================
  // DELETE LOG
  // =====================================

  const deleteLog = async (id) => {

    const confirmDelete =

      window.confirm(

        "Delete this log?"

      );

    if (!confirmDelete) {

      return;

    }

    try {

      await axios.post(

        "http://localhost/mini_splunk/backend/logs/delete_log.php",

        {

          id: id

        }

      );

      fetchLogs();

    }

    catch (error) {

      console.log(error);

    }

  };

  // =====================================
  // EXPORT CSV
  // =====================================

  const exportCSV = async () => {

    try {

      window.open(

        "http://localhost/mini_splunk/backend/logs/export_logs.php",

        "_blank"

      );

    }

    catch (error) {

      console.log(error);

      alert("CSV Download Failed");

    }

  };

  // =====================================
  // UI
  // =====================================

  return (

    <div
      style={{
        display: "flex",
        background: "#f3f4f6"
      }}
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div
        style={{

          marginLeft: "270px",

          width: "calc(100vw - 270px)",

          padding: "15px",

          overflowX: "auto",

          minHeight: "100vh"

        }}
      >

        {/* TITLE */}

        <h1
          style={{
            marginBottom: "15px",
            fontSize: "38px",
            color: "#111827"
          }}
        >

          Security Logs

        </h1>

        {/* BUTTONS */}

        <div
          style={{

            display: "flex",

            gap: "10px",

            marginBottom: "15px",

            flexWrap: "wrap"

          }}
        >

          {/* EXPORT */}

          <button

            onClick={exportCSV}

            style={{

              padding: "10px 18px",

              background: "#111827",

              color: "white",

              border: "none",

              borderRadius: "5px",

              cursor: "pointer",

              fontWeight: "bold",

              fontSize: "13px"

            }}
          >

            Download CSV

          </button>

          {/* REFRESH */}

          <button

            onClick={fetchLogs}

            style={{

              padding: "10px 18px",

              background: "green",

              color: "white",

              border: "none",

              borderRadius: "5px",

              cursor: "pointer",

              fontWeight: "bold",

              fontSize: "13px"

            }}
          >

            {

              loading

                ? "Refreshing..."

                : "Refresh Logs"

            }

          </button>

        </div>

        {/* TABLE */}

        <div
          style={{

            width: "100%",

            overflowX: "auto",

            background: "white",

            borderRadius: "10px",

            boxShadow:

              "0 2px 10px rgba(0,0,0,0.1)"

          }}
        >

          <table

            style={{

              width: "100%",

              fontSize: "12px",

              borderCollapse: "collapse",

              tableLayout: "fixed"

            }}
          >

            {/* HEADER */}

            <thead>

              <tr
                style={{

                  background: "#111827",

                  color: "white"

                }}
              >

                <th style={tableHeader}>
                  ID
                </th>

                <th style={tableHeader}>
                  Client
                </th>

                <th style={tableHeader}>
                  Message
                </th>

                <th style={tableHeader}>
                  Level
                </th>

                <th style={tableHeader}>
                  IP
                </th>

                <th style={tableHeader}>
                  Browser
                </th>

                <th style={tableHeader}>
                  Device
                </th>

                <th style={tableHeader}>
                  Country
                </th>

                <th style={tableHeader}>
                  City
                </th>

                <th style={tableHeader}>
                  ISP
                </th>

                <th style={tableHeader}>
                  Time
                </th>

                <th style={tableHeader}>
                  Action
                </th>

              </tr>

            </thead>

            {/* BODY */}

            <tbody>

              {

                logs.length > 0

                ?

                logs.map((log) => (

                  <tr key={log.id}>

                    <td style={tableData}>
                      {log.id}
                    </td>

                    {/* CLIENT */}

                    <td style={tableData}>

                      {

                        log.client_name

                        ||

                        "Unknown Client"

                      }

                    </td>

                    <td style={tableData}>
                      {log.log_message}
                    </td>

                    <td style={tableData}>

                      <span
                        style={{

                          color:

                            log.log_level ===
                            "HIGH"

                              ? "red"

                              : log.log_level ===
                                "MEDIUM"

                              ? "orange"

                              : "green",

                          fontWeight:
                            "bold"

                        }}
                      >

                        {log.log_level}

                      </span>

                    </td>

                    <td style={tableData}>
                      {log.ip_address}
                    </td>

                    <td style={tableData}>
                      {log.browser}
                    </td>

                    <td style={tableData}>
                      {log.device_info}
                    </td>

                    <td style={tableData}>
                      {log.country}
                    </td>

                    <td style={tableData}>
                      {log.city}
                    </td>

                    <td style={tableData}>
                      {log.isp}
                    </td>

                    <td style={tableData}>
                      {log.created_at}
                    </td>

                    <td style={tableData}>

                      <button

                        onClick={() =>

                          deleteLog(log.id)

                        }

                        style={{

                          background: "red",

                          color: "white",

                          border: "none",

                          padding: "6px 10px",

                          borderRadius: "5px",

                          cursor: "pointer",

                          fontSize: "11px"

                        }}
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))

                :

                (

                  <tr>

                    <td
                      colSpan="12"
                      style={{

                        textAlign:
                          "center",

                        padding: "20px"

                      }}
                    >

                      No Logs Found

                    </td>

                  </tr>

                )

              }

            </tbody>

          </table>

        </div>

      </div>

      {/* TOAST */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
      />

    </div>

  );

}

// =====================================
// TABLE HEADER STYLE
// =====================================

const tableHeader = {

  padding: "8px",

  border: "1px solid #374151",

  textAlign: "left",

  fontSize: "13px",

  background: "#111827",

  color: "white",

  whiteSpace: "nowrap"

};

// =====================================
// TABLE DATA STYLE
// =====================================

const tableData = {

  padding: "6px",

  border: "1px solid #d1d5db",

  verticalAlign: "top",

  fontSize: "11px",

  wordBreak: "break-word",

  maxWidth: "140px"

};

export default Logs;