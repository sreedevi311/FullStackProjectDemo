async function getMovies(req,res){
    const collection=req.collection
    const page=req.query.page
    const pageLimit=(page==1 ? 20 : 10)
    const skippabalePages=(page==2 ? 20 : 10)
    const movies=await collection.find().skip(skippabalePages*(page-1)).limit(pageLimit).toArray()
    
    res.json(movies)
}

module.exports={getMovies,}