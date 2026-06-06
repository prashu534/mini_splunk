import { useEffect, useState } from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function Charts() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios
      .get(
        "http://localhost/mini_splunk/backend/logs/chart_stats.php"
      )

      .then((response) => {

        setData(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);

  const COLORS = [

    "red",
    "orange",
    "green"

  ];

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "450px"
        }}
      >

        <h2>Threat Severity</h2>

        {

          data.length > 0 ? (

            <PieChart
              width={400}
              height={300}
            >

              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >

                {

                  data.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))

                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          ) : (

            <p>Loading Chart...</p>

          )

        }

      </div>

    </div>
  );
}

export default Charts;