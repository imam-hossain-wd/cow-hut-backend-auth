import mongoose from 'mongoose';
import app from './app';
import config from './config/index';


const { port, database_url } = config;

const run = async () => {
  try {
    await mongoose
      .connect(database_url as string)
      .then(() => console.log('database connected successfully'));

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
run().catch(error => console.log(error));
