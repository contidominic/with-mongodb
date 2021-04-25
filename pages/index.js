import { connectToDatabase } from "../util/mongodb";
import React from 'react';
export default function Movies({ movies }) {
  return (
    <div>
      <h1>Top 20 Movfies of All Time</h1>
      <p>
        <small>(According to Meracritic)</small>
      </p>
      <ul>
        {movies.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
 
