import React, { useState } from "react";
import { registerUser } from "../api";


const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { ok, data } = await registerUser(email,password);
      if (ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("İstek hatasi:", error);
      setMessage("❌ Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Kayıt Ol</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegisterForm;
