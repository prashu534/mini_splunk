import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

function Dashboard() {

  // =====================================
  // STATES
  // =====================================

  const [logs, setLogs] = useState([]);

  const [totalLogs, setTotalLogs] = useState(0);

  const [highAlerts, setHighAlerts] = useState(0);

  const [mediumAlerts, setMediumAlerts] = useState(0);

  const [lowAlerts, setLowAlerts] = useState(0);

  // =====================================
  // FETCH LOGS
  // =====================================

  const fetchLogs = async () => {

    try {

      const response = await axios.get(

        "http://localhost/mini_splunk/backend/logs/fetch_logs.php"

      );

      if (

        Array.isArray(response.data)

      ) {

        const data = response.data;

        setLogs(data);

        // TOTAL

        setTotalLogs(data.length);

        // COUNTS

        const high = data.filter(

          (log) =>

            log.log_level === "HIGH"

        ).length;

        const medium = data.filter(

          (log) =>

            log.log_level === "MEDIUM"

        ).length;

        const low = data.filter(

          (log) =>

            log.log_level === "LOW"

        ).length;

        setHighAlerts(high);

        setMediumAlerts(medium);

        setLowAlerts(low);

      }

    }

    catch (error) {

      console.log(error);

    }

  };

  // =====================================
  // PAGE LOAD
  // =====================================

  useEffect(() => {

    fetchLogs();

  }, []);

  // =====================================
  // GRAPH DATA
  // =====================================

  const pieData = [

    {

      name: "HIGH",

      value: highAlerts

    },

    {

      name: "MEDIUM",

      value: mediumAlerts

    },

    {

      name: "LOW",

      value: lowAlerts

    }

  ];

  const COLORS = [

    "#ef4444",

    "#f59e0b",

    "#10b981"

  ];

  const barData = [

    {

      name: "High",

      attacks: highAlerts

    },

    {

      name: "Medium",

      attacks: mediumAlerts

    },

    {

      name: "Low",

      attacks: lowAlerts

    }

  ];

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

      {/* MAIN */}

      <div
        style={{

          marginLeft: "270px",

          width: "calc(100vw - 270px)",

          padding: "20px",

          minHeight: "100vh"

        }}
      >

        {/* TITLE */}

        <h1
          style={{

            fontSize: "42px",

            marginBottom: "25px",

            color: "#111827"

          }}
        >

          Security Dashboard

        </h1>

        {/* CARDS */}

        <div
          style={{

            display: "grid",

            gridTemplateColumns:

              "repeat(auto-fit, minmax(220px, 1fr))",

            gap: "20px",

            marginBottom: "30px"

          }}
        >

          {/* TOTAL */}

          <div
            style={{

              background: "#111827",

              color: "white",

              padding: "25px",

              borderRadius: "12px"

            }}
          >

            <h2>Total Logs</h2>

            <h1
              style={{

                fontSize: "50px",

                marginTop: "10px"

              }}
            >

              {totalLogs}

            </h1>

          </div>

          {/* HIGH */}

          <div
            style={{

              background: "#ef4444",

              color: "white",

              padding: "25px",

              borderRadius: "12px"

            }}
          >

            <h2>High Alerts</h2>

            <h1
              style={{

                fontSize: "50px",

                marginTop: "10px"

              }}
            >

              {highAlerts}

            </h1>

          </div>

          {/* MEDIUM */}

          <div
            style={{

              background: "#f59e0b",

              color: "white",

              padding: "25px",

              borderRadius: "12px"

            }}
          >

            <h2>Medium Alerts</h2>

            <h1
              style={{

                fontSize: "50px",

                marginTop: "10px"

              }}
            >

              {mediumAlerts}

            </h1>

          </div>

          {/* LOW */}

          <div
            style={{

              background: "#10b981",

              color: "white",

              padding: "25px",

              borderRadius: "12px"

            }}
          >

            <h2>Low Alerts</h2>

            <h1
              style={{

                fontSize: "50px",

                marginTop: "10px"

              }}
            >

              {lowAlerts}

            </h1>

          </div>

        </div>

        {/* GRAPHS */}

        <div
          style={{

            display: "grid",

            gridTemplateColumns:

              "1fr 1fr",

            gap: "20px"

          }}
        >

          {/* PIE CHART */}

          <div
            style={{

              background: "white",

              padding: "20px",

              borderRadius: "12px",

              boxShadow:

                "0 2px 10px rgba(0,0,0,0.1)"

            }}
          >

            <h2
              style={{

                marginBottom: "20px"

              }}
            >

              Attack Distribution

            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie

                  data={pieData}

                  dataKey="value"

                  outerRadius={120}

                  label

                >

                  {

                    pieData.map(

                      (

                        entry,

                        index

                      ) => (

                        <Cell

                          key={`cell-${index}`}

                          fill={

                            COLORS[index]

                          }

                        />

                      )

                    )

                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* BAR GRAPH */}

          <div
            style={{

              background: "white",

              padding: "20px",

              borderRadius: "12px",

              boxShadow:

                "0 2px 10px rgba(0,0,0,0.1)"

            }}
          >

            <h2
              style={{

                marginBottom: "20px"

              }}
            >

              Threat Levels

            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart
                data={barData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="attacks"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RECENT LOGS */}

        <div
          style={{

            marginTop: "30px",

            background: "white",

            padding: "20px",

            borderRadius: "12px",

            overflowX: "auto",

            boxShadow:

              "0 2px 10px rgba(0,0,0,0.1)"

          }}
        >

          <h2
            style={{

              marginBottom: "20px"

            }}
          >

            Recent Threat Logs

          </h2>

          <table
            style={{

              width: "100%",

              borderCollapse:

                "collapse"

            }}
          >

            <thead
              style={{

                background: "#111827",

                color: "white"

              }}
            >

              <tr>

                <th style={tableHeader}>
                  ID
                </th>

                <th style={tableHeader}>
                  Threat
                </th>

                <th style={tableHeader}>
                  Level
                </th>

                <th style={tableHeader}>
                  IP Address
                </th>

                <th style={tableHeader}>
                  Time
                </th>

              </tr>

            </thead>

            <tbody>

              {

                logs.slice(0, 10).map(

                  (log) => (

                    <tr key={log.id}>

                      <td style={tableData}>
                        {log.id}
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
                        {log.created_at}
                      </td>

                    </tr>

                  )

                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

// =====================================
// TABLE STYLES
// =====================================

const tableHeader = {

  padding: "12px",

  border: "1px solid #374151",

  textAlign: "left"

};

const tableData = {

  padding: "10px",

  border: "1px solid #d1d5db"

};

export default Dashboard;