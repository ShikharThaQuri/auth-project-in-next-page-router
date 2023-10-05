const crypto = require("crypto");

const jwt = require("jsonwebtoken");

// require("dotenv").config();
const secret = "$hikhar8910" || process.env.PRIV_KEY;
// generating the hash password

const genHashPassword = (password) => {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

// Validating the hash password

const valHashPassword = (password, hash, salt) => {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashVerify;
};

function issueJWT(user) {
  const _id = user._id;
  const name = user.username;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    name: name,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });

  // console.log({ signedToken });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

function authMiddleware(req, res) {
  const tokenParts = req.headers.authorization.split(" ");

  if (
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    try {
      const verification = jwt.verify(tokenParts[1], secret);
      req.jwt = verification;
      return {
        success: true,
        msg: "You are authorized to visit this route",
      };
    } catch (error) {
      return {
        success: false,
        msg: "You are not authorized to visit this route",
      };
    }
  } else {
    return {
      success: false,
      msg: "You are not authorized to visit this route",
    };
  }
}

module.exports.genHashPassword = genHashPassword;
module.exports.valHashPassword = valHashPassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
