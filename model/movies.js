const pool = require("../config/config")
const errorHandler = require("../middleware/errorHandler")

class movies {
    //function itu jadi method kalo didalem Class
    static getMovies = async (next) => {
        const findQuery = `SELECT * FROM movies`

        try {
          const data = await pool.query(findQuery)

          return data.rows
        } catch(err) {
            next(errorHandler)
        }
    }

    static getMoviesById = async (id, next) => {
        const query = `SELECT * FROM movies WHERE id = $1;` // $1 itu placeholder

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

    static createMovies = async(moviesData, next) => {
        const {title, genres, year} = moviesData

        if(!title || !genres || !year) {
            return next({
                title: "paramsError"
            })
        }

        const query = `INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3);`

        try {
            const data = await pool.query(query, [title, genres, year])

            return data.rows[0];
        } catch{
            next(errorHandler)
        }

    }

    static update = async(id, moviesData, next) => {
        const {title, genres, year} = moviesData

        if(!title || !genres ||! year) {
            return next({
                title: "paramsError"
            })
        }

        const query = `
          UPDATE movies 
          SET title = $1, 
          genres = $2 ,
          year = $3
          WHERE id = $4;
        `
        try {
            const data = await pool.query(query, [title, genres, year, id])
            return data.rows[0]
        } catch(err) {
            next(errorHandler)
        }
    }

    static delete = async(id, next) => {
        const query = `DELETE FROM movies WHERE id = $1;`

        try {
            const data = await pool.query(query, [id])
            return data.rows[0]
        } catch(err){
            next(errorHandler)
        }
    }
};

module.exports = movies;
