import MovieItem from "./movieitem";

const Movies = (props)=>{
    return props.myMovies.map(
        (movie)=>{
            return <MovieItem mymovie={movie} key={movie._id} Reload={props.ReloadData} />
        }
    );
}

export default Movies;