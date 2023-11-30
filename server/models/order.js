import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  username: String, // Change "UserEmail" to "useremail"
  name: String,
  addres: String, // Corrected the field name to "address"
  phoneno: String,
  productid: String,
  producttitle: String,
  productqty: Number,
  totalPrice: Number, // Corrected the field name to "totalPrice"
  date: Date,
  image:String,
});

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
