  import Movies from "./movies";
  import { useEffect, useState } from "react";
  import axios from "axios";

  function Read() {
    // Initializing state variables using the useState hook
    const [data, setData] = useState([]);// To store the raw data from the API 
    const [movies, setMovies] = useState([]);// To store the list of movies fetched from the API

    // Function to reload movie data from the API
    const Reload = () => {
          console.log("Reloading movie data...");
          // Sending a GET request to fetch movies from the server
          axios.get('http://localhost:4000/api/movies')
              .then((response) => {
                  setData(response.data); // Setting the received data into the state (data)
              })
              .catch((error) => {
                  console.error("Error reloading data:", error);// Logging any errors that occur during the request
              });
      };

    // useEffect hook to fetch movies when the component is mounted (on initial load)
    useEffect(() => {
      // Sending a GET request to fetch movies from the server
      axios.get('http://localhost:4000/api/movies')
        .then((response) => {
          console.log(response.data);
          setMovies(response.data.movies); // Setting the movies array from the response into the state
        })
        .catch((error) => {
          console.log(error);
        });
    },[]);// Empty dependency array ensures this effect runs only once when the component mounts

    return (
      <div>
        <h3>Hello from read component!</h3>
        <Movies myMovies={movies} ReloadData={Reload} />
      </div>
    );
  }

  export default Read; // Exporting the Read component for use in other parts of the app