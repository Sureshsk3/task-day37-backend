import userModel from "../model/userModel.js";
import nodemailer from "nodemailer";
import "dotenv/config.js";
import auth from "../utils/auth.js";
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user) {
    try {
      const token = Math.random().toString(36).slice(-6);
      user.resetPasswordToken = token;
      user.resetPasswordExpiryTime = Date.now() + 300000;
      await userModel.updateOne(user);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: `${process.env.NODEMAILER_EMAIL}`,
          pass: `${process.env.NODEMAILER_PASSWORD}`,
        },
      });
      const info = await transporter.sendMail({
        from: `${process.env.NODEMAILER_EMAIL}`,
        to: user.email,
        subject: "Password Reset Link",
        text: `Here you can get a password reset link.\n\n You can use this token to forget your password : ${token}.\n\n If you not try to forget your password please let us know`,
      });
      res
        .status(200)
        .json({ message: "Resetlink Send Successfull", id: user._id });
    } catch (error) {
      res.status(400).send({
        message: "User Not Available",
      });
    }
  } else {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiryTime: { $gt: Date.now() },
    });

    if (user) {
      user.password = await auth.harshedItem(req.body.password);
      await userModel.updateOne(user);

      res.status(201).send({
        message: "User Edited Successful",
      });
    } else {
      res.status(400).json({ message: "Token not valid" });
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const verifyOtp = async (req, res, next) => {
  try {
    const { token, id } = req.params;
    const user = await userModel.findOne({
      resetPasswordToken: token,
      _id: id,
    });
    if (user) {
      res.status(200).send({
        message: "Token Verification Successful",
        token,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
export default {
  forgotPassword,
  resetPassword,
  verifyOtp,
};
