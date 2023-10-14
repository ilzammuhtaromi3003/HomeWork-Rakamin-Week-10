const movies = require("../model/movies")
const moviesService = require("../services/moviesService")

class moviesController {
    static index = async(req, res, next) => {

        try {
            const data = await moviesService.get_all_movies(next)
            res.status(200).json(data)
        }catch(err) {
            next(err)
        }
    }

    static show = async(req, res, next) => {
        const id = req.params.id
        try {
            const data = await movies.getMoviesById(id, next)
            
            if(!data) {
                next({name: "notFound"})
            } else {
              res.status(200).json(data)
            }
        } catch(err) {
            next(err)
        }
    }

    static create = async(req, res, next) => {
        const moviesData = req.body
        
        try {
            const data = await movies.createMovies(moviesData, next)
            res.status(201).json(data)
        } catch(err) {
            next(err)
        }
    }

    static update = async(req, res, next) => {
        const id = req.params.id
        const moviesData = req.body

        try {
            const data = await movies.update(id, moviesData, next)

            res.status(200).json(data)
        } catch(err) {
            next(err)
        }
    }

    static delete = async(req, res, next) => {
        const id = req.params.id
        try {
            const data = await movies.delete(id, next)
            res.status(200).json({message: "Movies deleted"})
        } catch(err) {
            next(err)
        }
    }

}

module.exports = moviesController;