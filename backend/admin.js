const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const hashedPassword = await bcrypt.hash('admin', 10);

  const admin = new User({
    username: 'admin',
    password: hashedPassword,
  });

  await admin.save();
  console.log('Админ создан!');
  process.exit();
};

createAdmin();
