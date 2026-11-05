import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

async function assignUserNumbers() {
  await mongoose.connect(process.env.MONGO_URI);

  const users = await User.find({}).sort({ createdAt: 1 });
  for (let i = 0; i < users.length; i++) {
    users[i].userNumber = i + 1;
    await users[i].save();
    console.log(`Assigned userNumber ${users[i].userNumber} to ${users[i].email}`);
  }

  await mongoose.disconnect();
  console.log('All users updated!');
}

assignUserNumbers();
