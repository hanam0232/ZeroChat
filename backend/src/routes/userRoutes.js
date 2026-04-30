const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/all", userController.getAllUsers);
router.post("/send-request", userController.sendFriendRequest);

module.exports = router;
