import userModel from "../model/userModel.js";
import auth from "../utils/auth.js";


const userOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne(
      { _id: id },
      { password: 0, status: 0, createdAt: 0 }
    );
    if (user) {
      res.status(200).send({
        message: "User Data Fetched Successfull",
        data: user,
      });
    } else {
      res.status(200).send({
        message: "User Not Available",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const createUser = async (req, res) => {
  try {

    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {      
      (req.body.password = await auth.harshedItem(req.body.password)),          
        await userModel.create(req.body);
      res.status(201).send({
        message: "User Created Successful",
      });
    } else {
      res.status(400).send({
        message: "User is Already Exisits",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export default {
  createUser,
  userOne,
};
