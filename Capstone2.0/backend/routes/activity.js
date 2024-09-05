const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const authenticate = require("../middleware/auth");

// Bulk Create
router.post("/", authenticate, async (req, res) => {
  try {
    const activities = req.body;
    const userId = req.userId; // Get userId from middleware

    // Create a list of promises to check for existing activities and save new ones
    const activityPromises = activities.map(async (activity) => {
      // Add userId to activity object
      activity.userId = userId;

      // Check if activity with the same name already exists
      const existingActivity = await Activity.findOne({ name: activity.name });

      if (!existingActivity) {
        // If activity does not exist, create a new one
        return new Activity(activity).save();
      } else {
        return;
      }
    });

    // Execute all promises
    const result = await Promise.all(activityPromises);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Activities
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.userId; // Get userId from middleware
    const { location, price, type } = req.query; // Extract search filters from query parameters

    // Construct the query object
    let query = { userId: userId };

    // Apply filters if provided
    if (location) {
      query.name = new RegExp(location, "i"); // Case-insensitive search on the name field
    }
    if (price) {
      query.price = price;
    }
    if (type) {
      query.type = type;
    }

    // Find activities with the constructed query
    const activities = await Activity.find(query);

    // Return the filtered activities
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });
    res.status(200).json({ message: "Activity deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
