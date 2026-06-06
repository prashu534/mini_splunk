import { useState } from "react";
import axios from "axios";

function Upload() {

  const [file, setFile] = useState(null);

  const uploadFile = () => {

    const formData = new FormData();

    formData.append("logfile", file);

    axios
      .post(
        "http://localhost/mini_splunk/backend/logs/upload.php",
        formData
      )

      .then((response) => {

        alert(response.data.message);

      })

      .catch((error) => {

        console.log(error);

      });

  };

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
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
        }}
      >

        <h2>Upload Security Logs</h2>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br /><br />

        <button
          onClick={uploadFile}
          style={{
            padding: "10px 20px",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >

          Upload

        </button>

      </div>

    </div>
  );
}

export default Upload;