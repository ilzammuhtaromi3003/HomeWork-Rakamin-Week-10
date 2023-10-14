const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "HW_10",
    password: "ilzam3003",
    port: 5432
})

module.exports = pool;