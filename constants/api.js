function getResp(selectedMovie){
    const resp = `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=024d69b581633d457ac58359146c43f6&language=en-US&append_to_response=videos`;
    return resp
}
function getSimilarResp(selectedMovie){
    const similarResp = `https://api.themoviedb.org/3/movie/${selectedMovie}/recommendations?api_key=024d69b581633d457ac58359146c43f6&language=en-US`;
    return similarResp
}
function getCastCrew(selectedMovie){
    const castCrew = `https://api.themoviedb.org/3/movie/${selectedMovie}/credits?api_key=024d69b581633d457ac58359146c43f6&language=en-US`;
    return castCrew
}

export {getResp, getSimilarResp, getCastCrew};
