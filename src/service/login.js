import userModel from "../model/userModel.js";
import auth from "../utils/auth.js";
const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email }); 
       
    if (user) {
      if (await auth.hashCompare(req.body.password, user.password)) {
        const payload = {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.phone,
        };
        const token = await auth.createToken(payload);
        
        res.status(201).send({
          message: "Login Successful",
          token,
          role: user.role,
          name:user.fullName,
          id:user._id
        });
      } else {
        res.status(400).send({
          message: "Password InCorrect",
        });
      }
    } else {
      res.status(400).send({
        message: "Email Id Not Available",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export default {
  login,
};
