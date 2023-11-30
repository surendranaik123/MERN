import mongoose from "mongoose";

const admShema = mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type:String,
    },
  });
  
  const admModel = mongoose.model("admin", admShema);
  export default admModel;
