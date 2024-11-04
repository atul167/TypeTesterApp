// routes/leaderboard.js

// This file is written by GPT
// Kindly see mongo docs for reference
import express from "express";
import Result from "../models/Result.js"; // Import the Result model

const router = express.Router();

// Define the leaderboard endpoint
router.get("/leaderboard", async (req, res) => {
  try {
    // Fetch results from the database, filter, calculate scores, sort, and limit to top 20
    const leaderboard = await Result.aggregate([
      {
        // Join with the User collection to get the username
        $lookup: {
          from: "users", // Name of the User collection
          localField: "userId", // Field in Result collection
          foreignField: "_id", // Field in User collection
          as: "userInfo", // Output array containing matching user info
        },
      },
      {
        // Unwind the userInfo array to make the username accessible as a single object
        $unwind: "$userInfo",
      },
      {
        // Filter out results with accuracy below 85%
        $match: {
          accuracy: { $gt: 85 },
        },
      },
      {
        // Calculate the weighted score using MongoDB's aggregation pipeline
        $addFields: {
          wpm: { $round: ["$wpm", 2] },
          accuracy: { $round: ["$accuracy", 2] },
          weightedScore: {
            $round: [
              {
                $add: [
                  { $multiply: ["$wpm", 0.85] }, // 85% weight for WPM
                  { $multiply: ["$accuracy", 0.15] }, // 15% weight for accuracy
                ],
              },
              2, // Number of decimal places
            ],
          },
        },
      },
      // Sort the results by weightedScore in descending order
      { $sort: { weightedScore: -1 } },
      // Limit the results to the top 20 entries
      { $limit: 20 },
      // Project the fields to include username from userInfo
      {
        $project: {
          _id: 0,
          username: "$userInfo.username", // Include username from the joined userInfo
          wpm: 1,
          accuracy: 1,
          weightedScore: 1,
        },
      },
    ]);

    // Send the leaderboard as a response
    res.json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

export default router;
