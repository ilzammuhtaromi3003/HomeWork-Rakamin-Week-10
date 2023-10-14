const users = require("../model/users");

class usersRepository {

    static all = async (next) => {
        try {
          const data = await users.getUsers(next);
          return data;
        } catch(err) {
            next(err);
        } 
    }
}

module.exports = usersRepository;