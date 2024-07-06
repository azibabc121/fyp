import mongoose, { syncIndexes } from "mongoose";
// functions are instructions

// we are gonna use async-await

// sync - synchrization
// async - asynchronization

// 2 points

// Point a -> number -> 1234
// point a and point b are connected to each other - if data changes on one end it will be reflected on other end
// point b -> number -> 1234

// async programming
// sync programming

// sync ->

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URL}/amra-fyp`);
    console.log(`\n MongoDB Connected !! DB Host: ${connection.connection.host}`)
  } catch (error) {
    console.log("Error while connecting to database : ", error);
  }
};

export default dbConnect;
