import UserModel from "../models/UserData.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const secretKey = 'yourSecretKey'; // Replace with your actual secret key


class userController {
 

  static createUser= async (req, res) => {
    const { name, email, password, age, phoneno } = req.body;
  
    try {
      const newUser = new UserModel({
        name,
        email,
        password,
        age,
        phoneno,
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: "Failed to create user" });
    }
  };
  
  static getAllUsers = async (req, res) => {
    try {
      const allUsers = await UserModel.find({});
      if (allUsers) {
        return res.status(200).json(allUsers);
    
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  }


  static updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const getUpdatedData = await UserModel.findByIdAndUpdate(id, req.body);
        return res.status(200).json(getUpdatedData);
      } else {
        return res.status(400).json({ message: "Id not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const getDeletedData = await UserModel.findByIdAndDelete(id);
        return res.status(200).json(getDeletedData);
      } else {
        return res.status(400).json({ message: "Id not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static loginAuth = async (req, res) => {

    const{email,password,name}=req.body

    try{
        const check=await UserModel.findOne({email:email,password:password,name:name})
  
        if(check){
            res.json(check)
        }
        else{
            res.json("notexist")
        }
  
    }
    catch(e){
        res.json("fail")
    }
  
  }
  // static loginAuth = async (req, res) => {
  //   const { email, password } = req.body;
  
  //   try {
  //     const user = await UserModel.findOne({ email });
  
  //     if (user) {
  //       const passwordMatch = await bcrypt.compare(password, user.password);
  
  //       if (passwordMatch) {
  //         // Passwords match, user is authenticated
  //         const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  
  //         res.json({ message: 'Authenticated', token });
  //       } else {
  //         // Passwords do not match
  //         res.status(401).json({ message: 'Incorrect password' });
  //       }
  //     } else {
  //       // User with the provided email does not exist
  //       res.status(404).json({ message: 'User not found' });
  //     }
  //   } catch (e) {
  //     // Handle other errors (e.g., database error)
  //     console.error(e);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // };

static logout = async (req, res) => {
  res.clearCookie('token'); // Clear the token or session cookie
  res.sendStatus(200);
}


static getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const getSingleData = await UserModel.findById(id);
      return res.status(200).json(getSingleData);
    } else {
      return res.status(400).json({ message: "Id not found" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};


}


export default userController;
