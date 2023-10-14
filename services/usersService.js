const usersRepository = require("../repositories/usersRepository")

class usersService {
    static get_all_users = async (next) => {

        try {
            const data = usersRepository.all(next);
            return data;
        } catch {
            next(err)
        }
    }
}

module.exports = usersService;