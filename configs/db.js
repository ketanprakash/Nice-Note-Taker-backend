const { Client } = require("pg");
const connectionString = process.env.PSQL_URL;
const client = new Client({
    connectionString,
})

module.exports = client;