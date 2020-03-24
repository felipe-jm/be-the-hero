const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

export default connection;