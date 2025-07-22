import React, { useState } from "react";
import { createTodo } from "../api";

const CreateTodo = ({ onTodoCreated }) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ Giriş yapmadan todo ekleyemezsiniz.");
      return;
    }

    try {
      const { ok, data } = await createTodo(text, token);
      if (ok) {
        setMessage("✅ Todo başarıyla eklendi!");
        setText("");  // ✅ sadece çağırıyoruz, atama yapmıyoruz
        onTodoCreated();
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("İstek hatası:", err);  // ✅ err yazıyoruz, error değil
      setMessage("❌ Todo eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <h3>Yeni Todo Ekle</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Yapılacak..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Ekle</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateTodo;
