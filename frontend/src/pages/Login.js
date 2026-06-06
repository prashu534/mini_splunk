import React, {

  useState

} from "react";

function Login() {

  // =====================================
  // STATES
  // =====================================

  const [username, setUsername] =
  useState("");

  const [password, setPassword] =
  useState("");

  // =====================================
  // LOGIN FUNCTION
  // =====================================

  const handleLogin = async () => {

    // =====================================
    // CHECK CREDENTIALS
    // =====================================

    if (

      username === "admin" &&

      password === "admin123"

    ) {

      // =====================================
      // RECORD ONLY ADMIN LOGIN
      // =====================================

      try {

        await fetch(

          "http://localhost/mini_splunk/backend/logs/activity_log.php",

          {

            method: "POST",

            headers: {

              "Content-Type":

              "application/x-www-form-urlencoded"

            },

            body:

            "page=Admin Login"

          }

        );

      }

      catch (error) {

        console.log(

          "Log Error:",

          error

        );

      }

      // =====================================
      // SAVE SESSION
      // =====================================

      sessionStorage.setItem(

        "loggedIn",

        "true"

      );

      // =====================================
      // REDIRECT
      // =====================================

      window.location.href =

      "/dashboard";

    }

    else {

      alert(

        "Invalid Username or Password"

      );

    }

  };

  // =====================================
  // UI
  // =====================================

  return (

    <div
      style={{

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:

        "#111827"

      }}
    >

      {/* LOGIN BOX */}

      <div
        style={{

          background: "white",

          padding: "40px",

          borderRadius: "15px",

          width: "400px",

          boxShadow:

          "0 0 20px rgba(0,0,0,0.3)"

        }}
      >

        {/* TITLE */}

        <h1
          style={{

            textAlign: "center",

            marginBottom: "10px",

            color: "#111827",

            fontSize: "42px"

          }}
        >

          Mini Splunk

        </h1>

        {/* SUBTITLE */}

        <p
          style={{

            textAlign: "center",

            color: "gray",

            marginBottom: "40px"

          }}
        >

          Security Operations Center

        </p>

        {/* USERNAME */}

        <input

          type="text"

          placeholder="Enter Username"

          value={username}

          onChange={(e) =>

            setUsername(

              e.target.value

            )

          }

          style={inputStyle}

        />

        {/* PASSWORD */}

        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e) =>

            setPassword(

              e.target.value

            )

          }

          style={inputStyle}

        />

        {/* BUTTON */}

        <button

          onClick={handleLogin}

          style={buttonStyle}

        >

          Login

        </button>

      </div>

    </div>

  );

}

// =====================================
// INPUT STYLE
// =====================================

const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "20px",

  borderRadius: "8px",

  border: "1px solid #ccc",

  fontSize: "16px",

  boxSizing: "border-box"

};

// =====================================
// BUTTON STYLE
// =====================================

const buttonStyle = {

  width: "100%",

  padding: "15px",

  background: "#2563eb",

  color: "white",

  border: "none",

  borderRadius: "8px",

  cursor: "pointer",

  fontSize: "18px",

  fontWeight: "bold"

};

export default Login;