const express = require("express");
const router = express.Router();
const authMiddleware = require("C:\\Users\\emirh\\todo-app\\todo-backend\\middleware\\authMiddleware");
const { getTodos, createTodo } = require("C:\\Users\\emirh\\todo-app\\todo-backend\\controllers\\todoController");

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);

module.exports = router;