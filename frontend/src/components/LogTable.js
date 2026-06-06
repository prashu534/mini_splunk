import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import axios from "axios";

function Logs() {

  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLogs = () => {

    axios
      .get(
        "http://localhost/mini_splunk/backend/logs/fetch_logs.php"
      )

      .then((response) => {

        setLogs(response.data);

      })

      .catch((error) => {

        console.log(error);

      });
  };

  useEffect(() => {

    fetchLogs();

    const interval = setInterval(() => {

      fetchLogs();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const exportCSV = () => {

    let csv =
      "ID,Message,Level,Created Time\n";

    logs.forEach((log) => {

      csv +=
        `${log.id},
${log.log_message},
${log.log_level},
${log.created_at}\n`;

    });

    const blob = new Blob(

      [csv],

      {
        type: "text/csv"
      }

    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "security_logs.csv";

    a.click();
  };

  return (

    <div
      style={{
        display: "flex"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f3f4f6",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div
          style={{
            padding: "20px"
          }}
        >

          <h1>Security Logs</h1>

          <input
            type="text"
            placeholder="Search Logs"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              padding: "10px",
              marginBottom: "20px",
              width: "300px"
            }}
          />

          <br />

          <button
            onClick={exportCSV}
            style={{
              padding: "10px 20px",
              marginBottom: "20px",
              background: "#0f172a",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >

            Export CSV

          </button>

          <table
            border="1"
            width="100%"
            cellPadding="10"
            style={{
              background: "white",
              borderCollapse: "collapse"
            }}
          >

            <thead
              style={{
                background: "#111827",
                color: "white"
              }}
            >

              <tr>

                <th>ID</th>

                <th>Message</th>

                <th>Level</th>

                <th>Created Time</th>

              </tr>

            </thead>

            <tbody>

              {

                logs
                  .filter((log) =>

                    log.log_message
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      )

                  )

                  .map((log) => (

                    <tr key={log.id}>

                      <td>{log.id}</td>

                      <td>{log.log_message}</td>

                      <td
                        style={{
                          color:

                            log.log_level === "HIGH"

                              ? "red"

                              : log.log_level === "MEDIUM"

                              ? "orange"

                              : "green",

                          fontWeight: "bold"
                        }}
                      >

                        {log.log_level}

                      </td>

                      <td>{log.created_at}</td>

                    </tr>

                  ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Logs;