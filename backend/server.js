import express from "express";
import testRoutes from "./src/routes/test.routes.js"; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

// Mount routes
app.use("/api/test", testRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
