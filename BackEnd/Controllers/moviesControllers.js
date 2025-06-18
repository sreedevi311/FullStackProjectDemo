const { ObjectId } = require('mongodb')

async function getMovies(req,res){
    const page=req.query.page
    const pageLimit=(page==1 ? 20 : 10)
    const skippabalePages=(page==2 ? 20 : 10)
    const movies=await req.db.collection('movies').find().skip(skippabalePages*(page-1)).limit(pageLimit).toArray()
    
    res.json(movies)
}
async function getMovieById(req, res){
  const id = req.params.id
  const movie = await req.db.collection('movies').findOne({ _id: new ObjectId(id) })
  if (!movie) return res.status(404).send('Movie not found')
  res.json(movie)
}

async function getDirectors(req,res){
  console.log("in getDirectors function")
    const page=req.query.page
    const movies=await req.db.collection('movies').find({}, { projection: { directors: 1, title: 1, _id: 0 } }).skip(20*(page-1)).limit(20).toArray()
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
    const page=req.query.page
    const movies=await req.db.collection('movies').find({}, { projection: { cast: 1, title: 1, _id: 0 } }).skip(20*(page-1)).limit(20).toArray()
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


async function searchMovies(req, res) {
  const query = req.query.q;
  const page=req.query.page
  if (!query) return res.json([]);

  const results = await req.db.collection('movies').find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { fullplot: { $regex: query, $options: 'i' } },
      { cast: { $elemMatch: { $regex: query, $options: 'i' } } },
      { genres: { $elemMatch: { $regex: query, $options: 'i' } } },
    ]
  }).skip(20*(page-1)).limit(20).toArray();

  res.json(results);
}

async function getComments(req, res){
  console.log("inside getComments")
  const { movieId } = req.params;
  const comments = await req.db
      .collection('comments')
      .find({ movie_id: new ObjectId(movieId) })
      .sort({ date: -1 }) // optional: newest first
      .limit(10)
      .toArray();

    res.json(comments);
}
module.exports={getMovies,getMovieById,getDirectors,getActors,searchMovies,getComments}