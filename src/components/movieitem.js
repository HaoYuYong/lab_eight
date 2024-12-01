import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";



const MovieItem = (props)=> {
  useEffect(() => {
    console.log("Movie Item:", props.mymovie);
  }, [props.mymovie]); // Only run this effect when the mymovie prop changes

  const handleDelete = (e)=>{
    e.preventDefault();

    axios.delete('http://localhost:4000/api/movie/'+props.mymovie._id)
    .then(() => {
      props.Reload(); // Refresh the movie list after deletion
    })
    .catch((err) => {
        console.log(err); //"Error deleting movie:", error
    });
  };

  return (
    <div>
      <Card>
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} />
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
        <Link className="btn btn-primary" to={"/edit/"+props.mymovie._id}>Edit</Link>
        {/* Other movie details */}
        <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

export default MovieItem;