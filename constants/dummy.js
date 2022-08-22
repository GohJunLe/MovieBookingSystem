import React, {useState, useEffect} from 'react'

// const fetchData=movie('https://api.themoviedb.org/3/movie/popular?api_key=024d69b581633d457ac58359146c43f6');
// const popularMovie=fetchData.data;
// fetchData=movie('https://api.themoviedb.org/3/movie/now_playing?api_key=024d69b581633d457ac58359146c43f6');
// const nowPlayingMovie=fetchData.data;

function movie(url){
    
const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  
  return {data,isLoading};
}

const genreList=[
    {"id":28,"name":"Action"},
    {"id":12,"name":"Adventure"},
    {"id":16,"name":"Animation"},
    {"id":35,"name":"Comedy"},
    {"id":80,"name":"Crime"},
    {"id":99,"name":"Documentary"},
    {"id":18,"name":"Drama"},
    {"id":10751,"name":"Family"},
    {"id":14,"name":"Fantasy"},
    {"id":36,"name":"History"},
    {"id":27,"name":"Horror"},
    {"id":10402,"name":"Music"},
    {"id":9648,"name":"Mystery"},
    {"id":10749,"name":"Romance"},
    {"id":878,"name":"Science Fiction"},
    {"id":10770,"name":"TV Movie"},
    {"id":53,"name":"Thriller"},
    {"id":10752,"name":"War"},
    {"id":37,"name":"Western"}]

    function getGenre(movie){
        if(movie!=null){
        const genre=[];
        for(var i=0;i<movie.length;i++){
            for (var j=0; j < genreList.length; j++) {
                if (genreList[j].id === movie[i]) {
                    genre.push(genreList[j].name+", ");
                    break;
                }
            }
        }
        return genre;
    }
    }

export{movie,getGenre};
