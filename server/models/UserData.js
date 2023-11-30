import mongoose from "mongoose";

const UserShema = mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
    phoneno: {
      type: Number,
    },
  });
  
  const UserModel = mongoose.model("UserData", UserShema);
  export default UserModel;