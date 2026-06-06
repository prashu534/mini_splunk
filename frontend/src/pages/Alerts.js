import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Alerts from "../components/Alerts";

function AlertsPage() {

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f3f4f6",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <Alerts />

      </div>

    </div>
  );
}

export default AlertsPage;