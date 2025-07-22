const User = require("C:\\Users\\emirh\\todo-app\\todo-backend\\models\\User");
const generateToken = require("C:\\Users\\emirh\\todo-app\\todo-backend\\utils\\generateToken");

// @desc    Kullanıcı kaydı
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcı zaten var mı kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kayıtlı." });
    }

    // Yeni kullanıcı oluştur
    const user = await User.create({ email, password });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası: " + error.message });
  }
};

// @desc    Kullanıcı girişi
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Geçersiz email veya şifre." });
    }

    // Şifreyi kontrol et
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Geçersiz email veya şifre." });
    }

    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası: " + error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
