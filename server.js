import express from "express";
import cors from "cors";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

import dotenv from "dotenv";
dotenv.config();

import bookRoutes from "./routes/bookRoutes";

// Seeding the database - comment out this code block once the database has been seeded
// if (process.env.RESET_DB) {
//   const seedDatabase = async () => {
//     await BookModel.deleteMany({})

//     booksData.forEach((bookData) => {
//       new BookModel(bookData).save();
//     });
//   }

//   seedDatabase();
// }

// Connect to the database through Mongoose for local development

const username = process.env.MONGO_USER;
const rawPassword = process.env.MONGO_PASS; // This is your raw, unencoded password

// Encode the password
const encodedPassword = encodeURIComponent(rawPassword);

// Construct the connection string
const connectionString = `mongodb+srv://${username}:${encodedPassword}@hang-cluster.ilbxyac.mongodb.net/project-mongo?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}); // Connect to the MongoDB database
mongoose.Promise = Promise; // Set Mongoose to use ES6 Promises


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. PORT is not stored in .env file, rather something copied from Express server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the book routes here
app.use(bookRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
