const moviesRepository = require ("../repositories/moviesRepository")

class moviesService {
    static get_all_movies = async (next) => {

        try {
            const data = moviesRepository.all(next);
            return data;
        } catch {
            next(err)
        }
    }
}

module.exports = moviesService;