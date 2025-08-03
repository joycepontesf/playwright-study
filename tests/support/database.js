const { Pool } = require('pg')
const data = require('./fixtures/database.json')

const DbConfig = {
    database: data.database,
    port: data.port,
    host: data.host,
    user: data.user,
    password: data.password,
}

export async function executeSQL(sqlScript) {
    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()
        const result = await client.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar script SQL:' + error)
    }
}