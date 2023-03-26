import express from "express";

import * as DB from "./mariadb.mjs";

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/alb-health-check", (req, res) => {
  res.send(new Date());
});

router.get("/delete-me-mariadb-test", async (req, res) => {
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

router.get("/error", (req, res) => {
  throw new Error("This was intentionally thrown.");
});

export default router;