const login = async () => {

  try {

    const response = await fetch(
      "http://localhost/mini_splunk/backend/login.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    );

    const text = await response.text();

    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);

    console.log(data);

    if (data.status === "success") {

      alert("Login Success");

    } else {

      alert(data.message || "Login Failed");

    }

  } catch (error) {

    console.log(error);

    alert(error.message);

  }

};