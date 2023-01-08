import express from "express";
import morgan from "morgan";

import * as DB from "./mariadb.mjs";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("combined"));

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/alb-health-check", (req, res) => {
	res.send(new Date());
});

app.get("/delete-me-mariadb-test", async (req, res) => {
	const query = "SELECT Host, User FROM mysql.user";
	const results = await DB.query(query);
	console.log("\n\nThe raw results object:");
	console.log(results);
	console.log("\nLettuce iterate!");
	for (const row of results) {
		console.log(`Found: ${row.User}@${row.Host}`);
	}
	res.json(results);
});

app.get("/error", (req, res) => {
	throw new Error("This was intentionally thrown.");
});

app.use((req, res) => {
	res.status(404).send("404 - File not found. Try again!\n");
});

app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).send("500 - Internal server error. Sorry, my bad!\n");
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
