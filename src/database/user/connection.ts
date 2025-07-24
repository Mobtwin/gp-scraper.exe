import mongoose from 'mongoose';

const userDB = mongoose.createConnection(process.env.MONGODB_USER_URI!);

userDB.on('connected', () => 
  console.log('USER DB connected'));

userDB.on('error', (err) => 
  console.error('USER DB connection error:', err));

export default userDB;