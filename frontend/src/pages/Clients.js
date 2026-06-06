import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Clients() {

  // =====================================
  // STATES
  // =====================================

  const [clientName, setClientName] =
  useState("");

  const [websiteURL, setWebsiteURL] =
  useState("");

  const [clients, setClients] =
  useState([]);

  // =====================================
  // FETCH CLIENTS
  // =====================================

  const fetchClients = async () => {

    try {

      const response = await axios.get(

        "http://localhost/mini_splunk/backend/clients/fetch_clients.php"

      );

      setClients(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  // =====================================
  // ADD CLIENT
  // =====================================

  const addClient = async () => {

    if (

      clientName === "" ||

      websiteURL === ""

    ) {

      alert(

        "Please fill all fields"

      );

      return;

    }

    try {

      await axios.post(

        "http://localhost/mini_splunk/backend/clients/add_client.php",

        {

          client_name: clientName,

          website_url: websiteURL

        }

      );

      alert(

        "Client Added Successfully"

      );

      setClientName("");

      setWebsiteURL("");

      fetchClients();

    }

    catch (error) {

      console.log(error);

    }

  };

  // =====================================
  // PAGE LOAD
  // =====================================

  useEffect(() => {

    fetchClients();

  }, []);

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

          Client Websites

        </h1>

        {/* ADD CLIENT */}

        <div
          style={{

            background: "white",

            padding: "20px",

            borderRadius: "10px",

            marginBottom: "30px"

          }}
        >

          <h2>

            Add New Client

          </h2>

          <input

            type="text"

            placeholder="Client Name"

            value={clientName}

            onChange={(e) =>

              setClientName(

                e.target.value

              )

            }

            style={inputStyle}

          />

          <input

            type="text"

            placeholder="Website URL"

            value={websiteURL}

            onChange={(e) =>

              setWebsiteURL(

                e.target.value

              )

            }

            style={inputStyle}

          />

          <button

            onClick={addClient}

            style={buttonStyle}

          >

            Add Client

          </button>

        </div>

        {/* CLIENT TABLE */}

        <div
          style={{

            background: "white",

            padding: "20px",

            borderRadius: "10px"

          }}
        >

          <h2>

            Connected Clients

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
                  Client Name
                </th>

                <th style={tableHeader}>
                  Website URL
                </th>

                <th style={tableHeader}>
                  API Key
                </th>

              </tr>

            </thead>

            <tbody>

              {

                clients.map(

                  (client) => (

                    <tr key={client.id}>

                      <td style={tableData}>
                        {client.id}
                      </td>

                      <td style={tableData}>
                        {client.client_name}
                      </td>

                      <td style={tableData}>
                        {client.website_url}
                      </td>

                      <td style={tableData}>
                        {client.api_key}
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
// STYLES
// =====================================

const inputStyle = {

  width: "100%",

  padding: "12px",

  marginTop: "15px",

  borderRadius: "5px",

  border: "1px solid #ccc"

};

const buttonStyle = {

  marginTop: "20px",

  padding: "12px 20px",

  background: "#2563eb",

  color: "white",

  border: "none",

  borderRadius: "5px",

  cursor: "pointer"

};

const tableHeader = {

  padding: "12px",

  border: "1px solid #374151",

  textAlign: "left"

};

const tableData = {

  padding: "10px",

  border: "1px solid #d1d5db"

};

export default Clients;