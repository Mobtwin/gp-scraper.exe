import mongoose from 'mongoose';

const mobtwinDB = mongoose.createConnection(process.env.MONGODB_MOBTWIN_URI!);

mobtwinDB.on('connected', () => 
  console.log('MOBTWIN DB connected'));

mobtwinDB.on('error', (err) => 
  console.error('MOBTWIN DB connection error:', err));

export default mobtwinDB;