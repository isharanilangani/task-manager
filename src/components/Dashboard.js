import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [authData, setAuthData] = useState("");

  useEffect(() => {
    // Read the response data from the cookie
    const cookieData = Cookies.get("authData");

    // Parse JSON data and handle the case where the cookie is not set
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        setAuthData(JSON.stringify(parsedData, null, 2)); // Format JSON for better readability
      } catch (error) {
        console.error("Error parsing cookie data:", error);
        setAuthData("Failed to parse data from the cookie.");
      }
    } else {
      setAuthData("No data found in cookie.");
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>Auth Data: {authData}</pre> {/* Using <pre> to display formatted JSON */}
    </div>
  );
};

export default Dashboard;
