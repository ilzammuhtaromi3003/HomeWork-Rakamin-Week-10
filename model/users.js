const pool = require("../config/config")
const errorHandler = require("../middleware/errorHandler")

class users {
    //function itu jadi method kalo didalem Class
    static getUsers = async (next) => {
        const findQuery = `SELECT * FROM users`

        try {
          const data = await pool.query(findQuery)

          return data.rows
        } catch(err) {
            next(errorHandler)
        }
    }

    static getUsersById = async (id, next) => {
        const query = `SELECT * FROM users WHERE id = $1;` // $1 itu placeholder

        try {
            const data = await pool.query(query, [id])

            if (data.rows.length === 0) {
                return null
            }

            return data.rows[0]
        } catch(err) {
            next(errorHandler)
        }
    }

    static createUsers = async(usersData, next) => {
        const {email, gender, password, role} = usersData

        if(!email || !gender || !password || !role) {
            return next({
                email: "paramsError"
            })
        }

        const query = `INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4);`

        try {
            const data = await pool.query(query, [email, gender, password, role])

            return data.rows[0];
        } catch{
            next(errorHandler)
        }

    }

    static update = async(id, usersData, next) => {
        const {email, gender, password, role} = usersData

        if(!email || !gender ||! password || !role) {
            return next({
                email: "paramsError"
            })
        }

        const query = `
          UPDATE users 
          SET email = $1, 
          gender = $2 ,
          password = $3,
          role = $4
          WHERE id = $5;
        `
        try {
            const data = await pool.query(query, [email, gender, password, role, id])
            return data.rows[0]
        } catch(err) {
            next(errorHandler)
        }
    }

    static delete = async(id, next) => {
        const query = `DELETE FROM users WHERE id = $1;`

        try {
            const data = await pool.query(query, [id])
            return data.rows[0]
        } catch(err){
            next(errorHandler)
        }
    }
};

module.exports = users;
