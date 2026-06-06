const lastLogKey = "last_log_time";

export const logActivity = async (message) => {

  try {

    const lastLog = sessionStorage.getItem(lastLogKey);
    const currentTime = Date.now();

    if (
      lastLog &&
      currentTime - parseInt(lastLog) < 3000
    ) {
      return;
    }

    sessionStorage.setItem(
      lastLogKey,
      currentTime
    );

    const ipResponse = await fetch(
      "https://ipapi.co/json/"
    );

    const ipData = await ipResponse.json();

    const formData = new URLSearchParams();

    formData.append("page", message);
    formData.append("public_ip", ipData.ip);
    formData.append("browser", navigator.userAgent);
    formData.append("device", navigator.platform);
    formData.append("country", ipData.country_name);
    formData.append("city", ipData.city);
    formData.append("isp", ipData.org);

    await fetch(
      "http://localhost/mini_splunk/backend/logs/activity_log.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      }
    );

  } catch (error) {

    console.log(error);

  }
};