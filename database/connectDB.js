import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO)
  console.log('connected')
}
catch (error) {
  console.log("couldn't connect" + error)
}