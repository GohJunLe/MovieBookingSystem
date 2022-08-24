const apiKey = "024d69b581633d457ac58359146c43f6";
const language="en-US";

function getResp(selectedMovie){
    const resp = `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${apiKey}&language=${language}&append_to_response=videos`;
    return resp
}
function getSimilarResp(selectedMovie){
    const similarResp = `https://api.themoviedb.org/3/movie/${selectedMovie}/recommendations?api_key=${apiKey}&language=${language}`;
    return similarResp
}
function getLanguageList(selectedMovie){
    const languageList = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`;
    return languageList
}

function getPopularResp(){
    const popularResp = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    return popularResp
}

export default {getResp, getSimilarResp, getLanguageList,getPopularResp};
