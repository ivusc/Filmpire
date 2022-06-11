import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

export const tmdbApi = createApi({
   reducerPath: 'tmdbApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
   endpoints: (builder) => ({
      //Get Genres
      getGenres: builder.query({
         query: () => `genre/movie/list?api_key=${tmdbApiKey}`
      }),
      //Get Movies by [Type]
      getMovies: builder.query({
         query: ({ genreIdOrCategoryName, page, searchQuery }) => {
            //get movies by search
            if (searchQuery) {
               return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
            }

            //get movies by category (name: string)
            if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string')
               return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;

            //get movies by genre (genre: number)
            if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number')
               return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
            

            //get popular movies
            return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
         },
      }),
   }),
})

export const {
   useGetMoviesQuery,
   useGetGenresQuery
} = tmdbApi;