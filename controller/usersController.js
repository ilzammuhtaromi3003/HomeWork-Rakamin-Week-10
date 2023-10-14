const users = require("../model/users")
const usersService = require("../services/usersService")

class usersController {
    static index = async(req, res, next) => {

        try {
            const data = await usersService.get_all_users(next)
            res.status(200).json(data)
        }catch(err) {
            next(err)
        }
    }

    static show = async(req, res, next) => {
        const id = req.params.id
        try {
            const data = await users.getUsersById(id, next)
            
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
        const usersData = req.body
        
        try {
            const data = await users.createUsers (usersData, next)
            res.status(201).json(data)
        } catch(err) {
            next(err)
        }
    }

    static update = async(req, res, next) => {
        const id = req.params.id
        const usersData = req.body

        try {
            const data = await users.update(id, usersData, next)

            res.status(200).json(data)
        } catch(err) {
            next(err)
        }
    }

    static delete = async(req, res, next) => {
        const id = req.params.id
        try {
            const data = await users.delete(id, next)
            res.status(200).json({message: "Users deleted"})
        } catch(err) {
            next(err)
        }
    }

}

module.exports = usersController;