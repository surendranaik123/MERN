import admModel from "../models/adm.js";

class admController {

static getAlladm = async (req, res) => {
  try {
    const allUsers = await admModel.find({});
    if (allUsers) {
      return res.status(200).json(allUsers);
  
    }
  } catch (error) {
    return res.status(400).json(error);
  }
}

static createadm = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name && email && password) {
      const newUser = admModel({
        name,
        email,
        password,
      });

      const saved_adm = await newUser.save();
      if (saved_adm) {
        return res.status(201).json(saved_adm);
      } else {
        return res.status(400).json({ message: "something wrong" });
      }
    } else {
      return res.status(400).json({ message: "all fields are required" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};



static loginAuth = async (req, res) => {
    const { email,password } = req.body;

    try {
    // Compare passwords
    const user = await userModel.findOne({password});

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

   //compare email
    const isemailValid = await bcrypt.compare({email});

    if (!isemailValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Passwords match, user is authenticated
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

}


export default admController;
