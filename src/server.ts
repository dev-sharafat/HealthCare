import app from "./app";
import { configs } from "./app/config";


// Start the server
try {
  app.listen(configs.PORT, () => {
    console.log(`Server is running on http://localhost:${configs.PORT}`);
  });
} catch (error) {
    console.error("Error starting the server:", error);
}
