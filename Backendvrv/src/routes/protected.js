const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth, checkRole } = require("../middleware/auth");

router.patch('/change-role/:userId', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { userId } = req.params;
    const { newRole } = req.body;
    if(!userId){
      res.status(400).json({
        error:"Invalid Id",
        message:"Invalid Id"
      })
    }
    const allowedRoles = ['user', 'moderator', 'admin'];
    if (!allowedRoles.includes(newRole)) {
      return res.status(400).json({ 
        error: 'Invalid role',
        message: 'Role must be either user, moderator, or admin' 
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: `Role updated to ${newRole}`,
      user: updatedUser
    });

  } catch (error) {
    console.error('Change role error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

router.get("/admin-dashboard", auth, checkRole(["admin"]), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    const users = await User.find().select("-password");
    res.json({
      users: users,
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
