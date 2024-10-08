import auth from "../utils/auth.js";

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];    
    if (token) {
      let payload = await auth.decodetoken(token);
      if (payload.exp > Math.floor(Date.now() / 1000)) {        
        next();
      } else {
        res.status(401).send({
          message: "Token Expired",
        });
      }
    } else {
      res.status(401).send({
        message: "Invalid token",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export default verify;
