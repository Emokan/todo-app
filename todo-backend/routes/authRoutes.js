const express = require('express');
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken"); 

// 🔐 Giriş (Login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre." });
    }

    const token = generateToken(user._id);
    res.json({ message: "Giriş başarılı", token });
  } catch (error) {
    console.error("🔴 login hatasi:", error.message, error.stack);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

// 📝 Kayıt (Register)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ message: "Kayıt başarılı", token });
  } catch (error) {
    console.error("🔴 register hatasi:", error.message, error.stack);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu." });
  }
});

module.exports = router;
