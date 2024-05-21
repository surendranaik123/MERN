// import mongoose from 'mongoose';

// const connectMongos = async () => {
//   try {
//     const res = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('Connection successfully');
//   } catch (error) {
//     console.log('Check:', error);
//   }
// };

// export default connectMongos;


import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongo;
