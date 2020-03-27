const crypto = require("crypto");

module.exports = function gerenateUniqueId() {
  return crypto.randomBytes(4).toString("HEX");
};
