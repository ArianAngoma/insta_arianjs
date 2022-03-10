import mongoose from 'mongoose';

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_MONGO!);
    console.log('DB online');
  } catch (e) {
    console.log(e);
    throw new Error(`Error connecting to DB`);
  }
};
