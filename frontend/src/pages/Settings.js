import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Settings() {

  const [blockedIPs, setBlockedIPs] = useState([]);

  // FETCH BLOCKED IPS

  const fetchBlockedIPs = async () => {

    try {

      const response = await axios.get(

        "http://localhost/mini_splunk/backend/logs/fetch_blocked_ips.php"

      );

      setBlockedIPs(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  // PAGE LOAD

  useEffect(() => {

    fetchBlockedIPs();

  }, []);

  // UNBLOCK

  const unblockIP = async (id) => {

    try {

      await axios.post(

        "http://localhost/mini_splunk/backend/logs/unblock_ip.php",

        {

          id: id

        }

      );

      fetchBlockedIPs();

    }

    catch (error) {

      console.log(error);

    }

  };

  // LOGOUT

  const logout = () => {

    sessionStorage.clear();

    window.location.href = "/login";

  };

  return (

    <div
      style={{
        display: "flex",
        background: "#f3f4f6"
      }}
    >

      <Sidebar />

      <div
        style={{

          marginLeft: "270px",

          width: "100%",

          padding: "20px"

        }}
      >

        <h1
          style={{

            fontSize: "40px",

            marginBottom: "20px"

          }}
        >

          Security Settings

        </h1>

        {/* BLOCKED IPS */}

        <div
          style={{

            background: "white",

            padding: "20px",

            borderRadius: "10px",

            overflowX: "auto"

          }}
        >

          <h2
            style={{

              marginBottom: "20px"

            }}
          >

            Blocked IP Addresses

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
                  IP Address
                </th>

                <th style={tableHeader}>
                  Attack Count
                </th>

                <th style={tableHeader}>
                  Blocked Until
                </th>

                <th style={tableHeader}>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {

                blockedIPs.length > 0

                ?

                blockedIPs.map(

                  (ip) => (

                    <tr key={ip.id}>

                      <td style={tableData}>
                        {ip.id}
                      </td>

                      <td style={tableData}>
                        {ip.ip_address}
                      </td>

                      <td style={tableData}>
                        {ip.attack_count}
                      </td>

                      <td style={tableData}>
                        {ip.blocked_until}
                      </td>

                      <td style={tableData}>

                        <button

                          onClick={() =>

                            unblockIP(ip.id)

                          }

                          style={{

                            background: "red",

                            color: "white",

                            border: "none",

                            padding: "8px 12px",

                            borderRadius: "5px",

                            cursor: "pointer"

                          }}
                        >

                          Unblock

                        </button>

                      </td>

                    </tr>

                  )

                )

                :

                (

                  <tr>

                    <td
                      colSpan="5"
                      style={{

                        textAlign:
                          "center",

                        padding: "20px"

                      }}
                    >

                      No Blocked IPs

                    </td>

                  </tr>

                )

              }

            </tbody>

          </table>

        </div>

        {/* LOGOUT */}

        <button

          onClick={logout}

          style={{

            marginTop: "20px",

            background: "red",

            color: "white",

            border: "none",

            padding: "12px 20px",

            borderRadius: "5px",

            cursor: "pointer"

          }}
        >

          Logout

        </button>

      </div>

    </div>

  );

}

const tableHeader = {

  padding: "12px",

  border: "1px solid #374151",

  textAlign: "left"

};

const tableData = {

  padding: "10px",

  border: "1px solid #d1d5db"

};

export default Settings;