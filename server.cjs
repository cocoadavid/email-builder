const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, "data", "emails.json");

const readData = () =>
  JSON.parse(fs.readFileSync(filePath, "utf-8"));

const writeData = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// --- GET all ---
app.get("/emails", (req, res) => {
  const data = readData();
  res.json(data.emails);
});

// --- GET by id ---
app.get("/emails/:id", (req, res) => {
  const data = readData();
  const email = data.emails.find((e) => e.id === req.params.id);
  if (!email) return res.status(404).json({ error: "Not found" });
  res.json(email);
});

// --- POST create ---
app.post("/emails", (req, res) => {
  const data = readData();
  const { randomUUID } = require("crypto");
  const newEmail = { id: randomUUID(), ...req.body };
  data.emails.push(newEmail);
  writeData(data);
  res.status(201).json(newEmail);
});

// --- PUT update ---
app.put("/emails/:id", (req, res) => {
  const data = readData();
  const index = data.emails.findIndex((e) => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  data.emails[index] = { ...data.emails[index], ...req.body };
  writeData(data);
  res.json(data.emails[index]);
});

// --- DELETE remove ---
app.delete("/emails/:id", (req, res) => {
  const data = readData();
  const index = data.emails.findIndex((e) => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  const deleted = data.emails[index];
  data.emails.splice(index, 1);
  writeData(data);
  res.json(deleted);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ API running on http://localhost:${PORT}`)
);
