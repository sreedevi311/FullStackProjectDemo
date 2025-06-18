const express=require('express')
const router=express.Router()

const moviesControllers =require('../Controllers/moviesControllers')

router.get('/',moviesControllers.getMovies)
router.get('/directors',moviesControllers.getDirectors)
router.get('/actors',moviesControllers.getActors)
router.get('/search', moviesControllers.searchMovies)
router.get('/comments/:movieId',moviesControllers.getComments)
router.get('/:id',moviesControllers.getMovieById)
module.exports=router