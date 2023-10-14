const movies = require("../model/movies");

class moviesRepository {

    static all = async (next) => {
        try {
          const data = await movies.getMovies(next);
          return data;
        } catch(err) {
            next(err);
        } 
    }
}

module.exports = moviesRepository;