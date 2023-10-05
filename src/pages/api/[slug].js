const connectdb = require("../../db/connectdb");
const user2 = require("../../models/user");
const utils = require("../../lib/utils");

export default async function Hroute(req, res) {
  await connectdb();

  const { slug } = req.query;

  const username = req.body.username;
  const password = req.body.password;

  const method = req.method;

  switch (method) {
    case "POST":
      try {
        if (slug === "login") {
          const user = await user2.findOne({ username: username });

          if (!user) {
            res.status(401).json({ mgs: "there is no such user" });
          }

          const isValid = utils.valHashPassword(password, user.hash, user.salt);

          if (isValid) {
            const { token, expires } = utils.issueJWT(user);

            res.status(200).json({
              success: true,
              token,
              expires,
            });
          } else {
            res.status(401).json({ success: false, msg: "wrong password" });
          }
        } else if (slug === "regester") {
          if (!password || !username) {
            res.status(404).json({
              success: false,
              msg: "you have to fill both UserName and Password",
            });
          } else {
            const saltHash = utils.genHashPassword(password);

            const hash = saltHash.hash;
            const salt = saltHash.salt;

            const newUser = new user2({
              username: username,
              hash: hash,
              salt: salt,
            });

            try {
              const result = await newUser.save();

              const { token, expires } = utils.issueJWT(result);

              res.status(201).json({
                success: true,
                token,
                expires,
              });
            } catch (error) {
              res.status(404).json({ error });
            }
          }
        } else {
          res.status(402).json({ success: false, msg: "not such page" });
        }
      } catch (error) {
        res.status(402).json({ error });
      }

      break;

    case "GET":
      try {
        if (slug === "user") {
          const { success, msg } = utils.authMiddleware(req, res);

          if (success === true) {
            const result = await user2.find({});

            res.status(201).json({ success: true, result });
          } else {
            res.status(401).json({ success: false, msg });
          }
        } else {
          res.status(402).json({ success: false, msg: "not such page" });
        }
      } catch (error) {
        res.status(403).json({ success: false, msg: error });
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
