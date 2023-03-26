import express from "express";
import morgan from "morgan";

import api from "./api.mjs";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("combined"));

app.use("/api", api);

app.use(express.static('frontend'))

app.use((req, res) => {
  res.status(404).send("404 - File not found. Try again!\n");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("500 - Internal server error. Sorry, my bad!\n");
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
