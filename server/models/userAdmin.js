import mongoose from "mongoose";

const userAdminSchema=mongoose.Schema(
    {
        fname: String,
        lname: String,
        phoneno:Number,
        address:String,
        email: { type: String, unique: true },
        password: String,
        userType: String,
    },
  
)
const userAdmin= mongoose.model("UserAdmininfo", userAdminSchema);
  export default userAdmin;
