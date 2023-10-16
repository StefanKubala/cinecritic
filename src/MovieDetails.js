import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function MovieDetails({watched, selectedId, onCloseMovie, onAddWatched}){
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isWatched = watched.map((movie)=> movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find((movie)=>movie.imdbID === selectedId)?.userRating

    const {
        Title: Title,
        Year: year,
        Poster: Poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
      } = movie;

      function handleAdd(){
        const newWatchedMovie = {
          imdbID:selectedId,
            Title, 
            year,
            Poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating
        }
        onAddWatched(newWatchedMovie);
        onCloseMovie()
      }

      useEffect(function(){
        async function getMovieDetails(){
          const res = await fetch(`http://www.omdbapi.com/?apikey=3fd96616&i=${selectedId}`);
          const data = await res.json();
          setMovie(data)
          console.log(data);
        }
        getMovieDetails()
      },[selectedId])

    return(
        <div className="details">
                {isLoading ? <Loader/> :
                <>
        <header>
            <button className="btn-back" onClick={onCloseMovie}>
            &larr;
            </button>
            <img src={Poster} alt={`Poster of ${Title}`}></img>
            <div className="details-overview">
            <h2>{Title}</h2>
            <p>
                {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p><span>⭐️</span>{imdbRating} IMDB rating</p>
            </div>
        </header>

        <section>
        <div className="rating">
        { !isWatched ?
        <>
        <StarRating
          maxRating={10} 
          size={24} 
          onSetRating={setUserRating}>
        </StarRating>
        {userRating > 0 && <button className="btn-add" onClick={handleAdd}>
          Add to list
        </button>}
        </> 
        : <p>You rated this movie {watchedUserRating} <span>⭐️</span></p>
      }
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring: {actors}</p>
        <p>Directed by: {director}</p>
      </section>
            </>
            }
        </div>
    )
}