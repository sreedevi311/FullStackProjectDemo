const express=require('express')
const router=express.Router()

const moviesControllers =require('../Controllers/moviesControllers')

router.get('/',moviesControllers.getMovies)

module.exports=router