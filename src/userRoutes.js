const express = require("express");
const users = require("./users");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
});

router.get("/", (req, res) => {
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "name and email are required" });
  }

  user.name = name;
  user.email = email;

  res.json({ message: "User updated", user });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deleted = users.splice(index, 1)[0];
  res.json({ message: "User deleted", user: deleted });
});

module.exports = router;