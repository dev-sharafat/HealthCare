import app from "./app";
import { configs } from "./app/config";


// Start the server
try {
  app.listen(configs.port, () => {
    console.log(`Server is running on http://localhost:${configs.port}`);
  });
} catch (error) {
    console.error("Error starting the server:", error);
}
