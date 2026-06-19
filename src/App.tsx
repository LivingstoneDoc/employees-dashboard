import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { employeeApi } from "./api/employeeApi";

function App() {
  const [page, setPage] = useState(1);
  useEffect(() => {
    const testApi = async () => {
      try {
        console.log("Fetching all employees in progress...");
        const data = await employeeApi.getAll(page, 15);
        console.log("Employees for this page:", data.data);
        console.log("Total emplyees", data.total);
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
