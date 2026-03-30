const express = require("express");
const userRoutes = require("./userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/users", userRoutes);

app.get("/health", (req, res)=>{
  res.status(200).json({ message: "Server is healthy" });
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});