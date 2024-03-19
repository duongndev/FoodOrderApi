const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers?.authorization?.startsWith("Bearer");
  let token;
  try{
    if (authHeader) {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    }
  }catch(err){
    res.send({
      success: false,
      message: err.message
    })
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.send({
        status: false,
        message: "You are not alowed to do that!"
      })
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.send({
        success: false,
        message: "You are not alowed to do that!"
      })
    }
  });
};

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
};


module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  generateJwtToken
};
