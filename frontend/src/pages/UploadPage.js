import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";

function UploadPage() {

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

          <h1>Upload Logs</h1>

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              marginTop: "20px",
              width: "80%",
              boxShadow:
                "0 0 10px rgba(0,0,0,0.1)"
            }}
          >

            <Upload />

          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadPage;