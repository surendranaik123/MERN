import OrderModel from "../models/order.js";

class orderController {
 
    static createOrder= async (req, res) => {
      const {username,name,addres, phoneno , productid, producttitle, productqty,date ,totalPrice,image} = req.body;
    
      try {
        const newUser = OrderModel({
          username,
          name,
          addres,
          phoneno,
          productid,
          producttitle,
          productqty,
          totalPrice,
          date,
          image
        });
    
        const savedUser = await newUser.save();
    
        res.status(201).json(savedUser);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: "Failed to create user" });
      }
    };

    static getAllOrders = async (req, res) => {
      try {
        const allOrders = await OrderModel.find({});
        res.status(200).json(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
      }
    };

 // In your orderController
static emailverify = async (req, res) => {
  const { email } = req.query;

  try {
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    const filteredOrders = await OrderModel.find({ useremail: email });
    res.json(filteredOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
static searchOrderByUsername = async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({ error: 'Username parameter is required' });
    }

    const filteredOrders = await OrderModel.find({ username: name });
    res.json(filteredOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

  
};





export default orderController;