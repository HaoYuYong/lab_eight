const express = require('express');
const app = express();
const port = 4000; // Setting the port number to 4000

// Importing CORS (Cross-Origin Resource Sharing) middleware
const cors = require('cors');
app.use(cors()); // Enabling CORS for all origins

// Middleware for setting custom headers to allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Body parser middleware to parse URL-encoded data and JSON data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to MongoDB using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14');

// Defining a schema for the movie document
const movieSchema = new mongoose.Schema({
  title: String,  // Title of the movie
  year: String,  // Year of release
  poster: String  // URL of the movie's poster image
});

// Creating a mongoose model based on the movie schema
const movieModel = new mongoose.model('sdfsdfsdf45',movieSchema);

// Route to get all movies from the database
app.get('/api/movies', async (req, res) => {
    const movies = await movieModel.find({});
    res.status(200).json({movies})
});

// Route to get a specific movie by its ID
app.get('/api/movie/:id', async (req ,res)=>{
  const movie = await movieModel.findById(req.params.id);
  res.json(movie);
})

// Route to update a specific movie by its ID
app.put('/api/movie/:id', async (req, res)=>{
  const movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(movie);
})

// Route to delete a specific movie by its ID
app.delete('/api/movie/:id', async (req, res) => {
  console.log('Deleting movie with ID:', req.params.id);
  res.send(movie);
  const movie = await movieModel.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Movie deleted successfully", movie });
});

// Route to add a new movie
app.post('/api/movies',async (req, res)=>{
    console.log(req.body.title);
    const {title, year, poster} = req.body; // Destructuring the request body to extract movie data

    const newMovie = new movieModel({title, year, poster});// Creating a new movie document
    await newMovie.save(); // Saving the new movie document to the database

    res.status(201).json({"message":"Movie Added!",Movie:newMovie}); // Returning a success message with the new movie data
})

// Starting the server on port 4000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Logging a message when the server starts
});

// {
//   "Title": "Avengers: Infinity War (server)",
//   "Year": "2018",
//   "imdbID": "tt4154756",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
// },
// {
//   "Title": "Captain America: Civil War (server)",
//   "Year": "2016",
//   "imdbID": "tt3498820",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
// },
// {
//   "Title": "World War Z (server)",
//   "Year": "2013",
//   "imdbID": "tt0816711",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
// }