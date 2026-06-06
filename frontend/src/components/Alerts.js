import { useEffect, useState } from "react";
import axios from "axios";

function Alerts() {

  const [highThreats, setHighThreats] = useState(0);

  const fetchAlerts = () => {

    axios
      .get(
        "http://localhost/mini_splunk/backend/logs/stats.php"
      )

      .then((response) => {

        setHighThreats(
          response.data.high_threats
        );

      })

      .catch((error) => {

        console.log(error);

      });
  };

  useEffect(() => {

    fetchAlerts();

    const interval = setInterval(() => {

      fetchAlerts();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      {

        highThreats > 0 && (

          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "20px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >

            🚨 HIGH Severity Threats Detected:
            {" "}
            {highThreats}

          </div>

        )

      }

    </div>
  );
}

export default Alerts;