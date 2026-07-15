import app from "./app";

const port = process.env.SERVER_PORT || 3000;

// Start the server
try {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (error) {
    console.error("Error starting the server:", error);
}
