const knex = require("knex");
const configuration = require("../../knexfile");

const config = process.env.NODE_ENV
  ? configuration.test
  : configuration.development;

const connection = knex(config);

export default connection;
