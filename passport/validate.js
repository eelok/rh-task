const { User } = require("../models");
const bcrypt = require("bcrypt");

const fromBase64 = (str) => Buffer.from(str, "base64").toString("utf8");

const getUser = async (username, password) => {
  const user = await User.findOne({ where: { email: username } });
  if (!user) {
    return undefined;
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return undefined;
  }
  return user;
};

function parseUserFromRequest(req) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader) {
    return undefined;
  }
  const [, token] = authHeader.split(" ");
  const decodedToken = fromBase64(token);
  const [email, password] = decodedToken.split(":");

  return { email, password };
}

const validateUser = async ({ req }) => {
  const credentials = parseUserFromRequest(req);
  if (!credentials) {
    return undefined;
  }
  const {email, password} = credentials;
  const user = await getUser(email, password);

  return { user };
};

module.exports.validateUser = validateUser;
module.exports.parseUserFromRequest = parseUserFromRequest;
