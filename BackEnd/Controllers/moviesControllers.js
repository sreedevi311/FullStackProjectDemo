const { ObjectId } = require('mongodb')

async function getMovies(req,res){
    const collection=req.collection
    const page=req.query.page
    const pageLimit=(page==1 ? 20 : 10)
    const skippabalePages=(page==2 ? 20 : 10)
    const movies=await collection.find().skip(skippabalePages*(page-1)).limit(pageLimit).toArray()
    
    res.json(movies)
}
async function getMovieById(req, res){
  const id = req.params.id
  const movie = await collection.findOne({ _id: new ObjectId(id) })
  if (!movie) return res.status(404).send('Movie not found')
  res.json(movie)
}

async function getDirectors(req,res){
  console.log("in getDirectors function")
    const collection=req.collection
    const page=req.query.page
    const movies=await collection.find({}, { projection: { directors: 1, title: 1, _id: 0 } }).skip(20*(page-1)).limit(20).toArray()
    const directorMap = {};
    movies.forEach(movie => {
    movie.directors.forEach(director => {
      if (!directorMap[director]) directorMap[director] = [];
      directorMap[director].push(movie.title);
    });
  });

  const result = Object.entries(directorMap).map(([director, movies]) => ({
    director,
    movies
  }));

  res.json(result);
}

async function getActors(req,res){
  console.log("in getActors function")
    const collection=req.collection
    const page=req.query.page
    const movies=await collection.find({}, { projection: { cast: 1, title: 1, _id: 0 } }).skip(20*(page-1)).limit(20).toArray()
    const actorMap = {};
    movies.forEach(movie => {
    movie.cast.forEach(actor => {
      if (!actorMap[actor]) actorMap[actor] = [];
      actorMap[actor].push(movie.title);
    });
  });

  const result = Object.entries(actorMap).map(([actor, movies]) => ({
    actor,
    movies
  }));

  res.json(result);
}
module.exports={getMovies,getMovieById,getDirectors,getActors}