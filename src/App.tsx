import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { employeeApi } from "./api/employeeApi";

function App() {
  useEffect(() => {
    const testApi = async () => {
      try {
        console.log("Fetching all employees in progress...");
        const data = await employeeApi.getAll();
        console.log("All employees successfully fetched:", data);
        console.log("First employee:", data[0]);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    testApi();
  }, []);
  return (
    <MantineProvider>
      <h1>Testing API in console</h1>
    </MantineProvider>
  );
}

export default App;
