require('dotenv').config();
console.log("Mongo URI:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log("✅ MongoDB bağlantısı başarılı"))
.catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

app.get("/", (req, res) => {
  res.send("Sunucu çalışıyor!");
});

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});


