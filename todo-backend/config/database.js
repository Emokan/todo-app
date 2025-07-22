// // config/database.js
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todo_app");
//     console.log(`✅ MongoDB bağlantısı başarılı: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB bağlantı hatası:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
