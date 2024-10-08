import bcrypt from "bcryptjs";
import "dotenv/config.js";
import jwt from "jsonwebtoken";

const harshedItem = async (item) => {
  try {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const harsedpassword = bcrypt.hashSync(item, salt);
    return harsedpassword;
  } catch (error) {
    throw error;
  }
};
const hashCompare = async (password, harshPassword) => {
  try {
    return await bcrypt.compare(password, harshPassword);
  } catch (error) {
    throw error;
  }
};
const createToken = async (payload) => {
  
  try {
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  } catch (error) {
    throw error;
  }
};
const decodetoken = async (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw error;
  }
};
export default {
  harshedItem,
  hashCompare,
  createToken,
  decodetoken,
};
