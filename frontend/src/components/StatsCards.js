function StatsCards() {

  const cardStyle = {

    background: "white",

    padding: "20px",

    width: "220px",

    borderRadius: "10px",

    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"

  };

  return (

    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px"
      }}
    >

      <div style={cardStyle}>

        <h3>Total Logs</h3>

        <h1>120</h1>

      </div>

      <div style={cardStyle}>

        <h3>Threats</h3>

        <h1>15</h1>

      </div>

      <div style={cardStyle}>

        <h3>Blocked IPs</h3>

        <h1>8</h1>

      </div>

    </div>
  );
}

export default StatsCards;