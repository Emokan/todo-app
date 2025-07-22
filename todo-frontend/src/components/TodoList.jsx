import React, { useState, useEffect } from "react";
import CreateTodo from "./CreateTodo";
import { getTodos } from "../api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("⚠️ Giriş yapmadan verileri göremezsiniz.");
      return;
    }

    try {
      const { ok, data } = await getTodos(token);
      if (ok) {
        setTodos(data);
        setMessage("✅ Veriler başarıyla yüklendi.");
      } else  {
        setMessage(`❌ ${data.message || "Veriler alınamadı."}`);
      }
    } catch (error) {
      console.error("İstek hatasi:", error);
      setMessage("❌ Todo verileri alınırken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>✅ Yapılacaklar Listesi</h2>
      <CreateTodo onTodoCreated={fetchTodos} />
      <p>{message}</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
