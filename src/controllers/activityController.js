const Activity = require("../models/activity");

const createOrUpdateActivity = (req, res) => {
  const { date, duration, distance, type, distance_unit } = req.body;
  const userId = req.user.id;

  let existingActivity;

  Activity.findOne({
    where: {
      user_id: userId,
      type,
      date,
    },
  })
    .then((activity) => {
      existingActivity = activity;
      if (existingActivity) {
        return existingActivity.update({
          duration,
          distance,
          distance_unit: distance_unit, // Set the distance_unit for update
        });
      } else {
        return Activity.create({
          date,
          duration,
          distance,
          type,
          user_id: userId,
          distance_unit: distance_unit,
        });
      }
    })
    .then((activity) => {
      if (existingActivity) {
        res
          .status(200)
          .json({ message: "Activity updated successfully", activity });
      } else {
        res
          .status(201)
          .json({ message: "Activity created successfully", activity });
      }
    })
    .catch((error) => {
      console.error("Error creating/updating activity:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getAllActivities = async (req, res) => {
  try {
    const userId = req.user.id;

    Activity.findAll({ where: { user_id: userId } })
      .then((activities) => {
        res.status(200).json(activities);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const activityName = req.params.activityName;

    Activity.findOne({ where: { type: activityName, user_id: userId } })
      .then((activity) => {
        if (!activity) {
          return res.status(404).json({ error: "Activity not found" });
        }
        res.status(200).json(activity);
      })
      .catch((error) => {
        console.error("Error fetching activity by ID:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    console.error("Error fetching activity by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const activityName = req.params.activityName;

    Activity.update(req.body, {
      where: { type: activityName, user_id: userId },
    })
      .then(([updatedRows]) => {
        if (updatedRows === 0) {
          return res.status(404).json({ error: "Activity not found" });
        }
        res.status(200).json({ message: "Activity updated successfully" });
      })
      .catch((error) => {
        console.error("Error updating activity:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteActivity = async (req, res) => {
    try {
      const userId = req.user.id;
      const { activityType, date } = req.body;
      await Activity.destroy({
        where: {
          user_id: userId,
          type: activityType,
          date: date,
        },
      })
      .then(deletedRows => {
        if (deletedRows === 0) {
          res.status(404).json({ error: 'Activities not found' });
        } else {
           res.status(204).json({ message: 'Activities deleted successfully' });
        }
      })
      .catch(error => {
        console.error('Error deleting activities:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
    } catch (error) {
      console.error('Error deleting activities:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
module.exports = {
  createOrUpdateActivity,
  getAllActivities,
  getActivity,
  updateActivity,
  deleteActivity,
};
