import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import FoodList from "../../components/FoodPage/FoodList";
// import MovieList from "../../types/movieList";
import axios from "axios";
import MovieList from "../../types/movieList";
import { Type } from "../../components/FoodPage/FoodList";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Post } from "@prisma/client";

type Props = {
  movieList: Post[];
};

const MoviePage: NextPage<Props> = ({ movieList }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Favourite Movies</title>
        <meta name="description" content="List of my favourite movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Favourite Movies</h1>
      </header>
      <main className={styles.main}>
        <FoodList type={Type.Movie} foodList={movieList} />
      </main>
    </div>
  );
};

export default MoviePage;

export const getServerSideProps = withPageAuth({
  redirectTo: "/sign-in",
  async getServerSideProps() {
    const API_KEY = process.env.TMDB_API_KEY;
    const URL = `
  https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&adult=false&language=en-US`;
    const response = await axios.get(URL);
    const movieListResponse: MovieList = await response.data.results;
    const movieList: Post[] = movieListResponse.map((movie) => {
      return {
        id: movie.id.toString(),
        title: movie.title,
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        rating: parseFloat(`${movie.vote_average}`),
        isPublic: false,
        authorId: "unknown",
        createdAt: JSON.parse(JSON.stringify(new Date())),
        updatedAt: JSON.parse(JSON.stringify(new Date())),
      };
    });
    return {
      props: {
        movieList: movieList,
      },
    };
  },
});
