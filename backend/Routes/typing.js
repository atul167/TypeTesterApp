import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Result from "../models/Result.js";
import calculateSpeed from "../algo.js";
import authenticate from "../middleware/authenticate.js";
import textdata from "../db/data.js";

router.get("/line", authenticate, async (req, res) => {
  const randomIndex = Math.floor(Math.random() * textdata.data.length);
  const line = textdata.data[randomIndex];
  res.json({ line });
});

router.get("/test", authenticate, async (req, res) => {
  const { userId } = req.user;
  res.json({ userId });
});

router.post("/result", authenticate, async (req, res) => {
  const { userId } = req.user;
  const { wpm, accuracy } = req.body;
  try {
    const result = new Result({ userId, wpm, accuracy });
    await result.save();
    res.json({ message: "Result saved" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/user", authenticate, async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching username:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/results", authenticate, async (req, res) => {
  const { userId } = req.user;
  try {
    const results = await Result.find({ userId });
    res.json({ results });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default router;
