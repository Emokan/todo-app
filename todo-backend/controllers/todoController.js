const Todo = require("C:\\Users\\emirh\\todo-app\\todo-backend\\models\\Todo");

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "Görevler alinmadi.", error: err.message });
    }
};

exports.createTodo = async (req, res) => {
    const { text } = req.body;
    try {
        const newTodo = new Todo({ text, userId: req.user.id });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: "Görev oluşturulamadi.", eror: err.message });
    }
};