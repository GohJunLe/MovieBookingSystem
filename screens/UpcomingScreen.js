import ComingSoon from "../components/ComingSoon"
import SearchBar from "../components/SearchBar";
import {SafeAreaView} from "react-native";
import React, {useState} from "react";
import {COLORS} from "../constants";
import {movie} from "../constants/dummy";

const UpcomingScreen = ({ navigation }) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const movieDetail=movie("https://api.themoviedb.org/3/movie/upcoming?api_key=024d69b581633d457ac58359146c43f6&language=en-US&page=1");
    const comingSoonMovie=movieDetail.data;
    
    return (
      <SafeAreaView style={{
        backgroundColor: COLORS.black,
        }}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        { (
            <ComingSoon 
              searchPhrase={searchPhrase}
              data = {comingSoonMovie.results}
              setClicked={setClicked}
              navigation = {navigation}
            />
        )}
      </SafeAreaView>
    );
  };
  
  export default UpcomingScreen;
