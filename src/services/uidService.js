const { uuid } = require("uuidv4");


module.exports = function generateUniqueId() {
  return uuid();
}
