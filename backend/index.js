const express = require("express");
const connectDb = require("./db.js");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const port = 5001;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/treks",require("./Routes/WeatherData.js"));
app.use("/api/hills",require("./Routes/HillsData.js"));
app.use("/api/getreview",require("./Routes/reviews.js"));
app.use("/api/createuser", require("./Routes/Createuser"));
app.use("/api/loginuser", require("./Routes/Login"));
app.use("/api/postreview",require("./Routes/reviews.js"));
app.use("/api/postguide",require("./Routes/Guides.js"));
app.use("/api/getguide",require("./Routes/Guides.js"));
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
