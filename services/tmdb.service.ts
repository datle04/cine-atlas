import { tmdbClient } from "@/lib/tmdb-client";
import { Credits, Genre, ImageResponse, Movie, MovieDetails, Person, PersonDetails, ReviewsResponse, TMDBResponse, TV, TVDetails, VideosResponse } from "@/types/tmdb";

// ==========================================
// 1. TRENDING & DISCOVER
// ==========================================

export const getTrending = async (
  mediaType: "all" | "movie" | "tv" | "person" = "all",
  timeWindow: "day" | "week" = "day"
) => {
  const { data } = await tmdbClient.get<TMDBResponse<Movie | TV | Person>>(`/trending/${mediaType}/${timeWindow}`);
  return data.results;
};

// ==========================================
// 2. MOVIES
// ==========================================

export const getPopularMovies = async (page = 1) => {
  const { data } = await tmdbClient.get<TMDBResponse<Movie>>("/movie/popular", { params: {page} });
  return data;
};

export const getTopRatedMovies = async (page = 1) => {
  const { data } = await tmdbClient.get<TMDBResponse<Movie>>("/movie/top_rated", { params: {page} });
  return data;
};

export const getUpComingMovies = async (page = 1) => {
  const { data } =  await tmdbClient.get<TMDBResponse<Movie>>("/movie/upcoming", { params: {page} });
  return data;
}

export const getMovieDetails = async (id: string | number) => {
  const { data } = await tmdbClient.get<MovieDetails>(`/movie/${id}`);
  return data;
};

export const getMovieCredits = async (id: string | number) => {
  const { data } = await tmdbClient.get<Credits>(`/movie/${id}/credits`);
  return data;
};

export const getMovieVideos = async (id: string | number) => {
  const { data } = await tmdbClient.get<VideosResponse>(`/movie/${id}/videos`);
  return data.results.filter((vid) => vid.site === "YouTube" && vid.type === "Trailer");
};

export const getMovieReviews = async (id: string | number, page = 1) => {
  const { data } = await tmdbClient.get<ReviewsResponse>(`/movie/${id}/reviews`, { params: { page } });
  return data;
};

export const getSimilarMovies = async (id: string | number) => {
  const { data } = await tmdbClient.get<TMDBResponse<Movie>>(`/movie/${id}/similar`);
  return data.results;
};

// ==========================================
// 3. TV SHOWS
// ==========================================

export const getPopularTVShows = async (page = 1) => {
  const { data } = await tmdbClient.get<TMDBResponse<TV>>(`/tv/popular`, { params: {page} });
  return data;
}

export const getTopRatedTVShows = async (page = 1) => {
  const { data } = await tmdbClient.get<TMDBResponse<TV>>("/tv/top_rated", { params: { page } });
  return data;
};

export const getTVDetails = async (id: string | number) => {
  const { data } = await tmdbClient.get<TVDetails>(`/tv/${id}`);
  return data;
};

export const getTVCredits = async (id: string | number) => {
  const { data } = await tmdbClient.get<Credits>(`/tv/${id}/credits`);
  return data;
};

export const getTVVideos = async (id: string | number) => {
  const { data } = await tmdbClient.get<VideosResponse>(`/tv/${id}/videos`);
  return data.results.filter((vid) => vid.site === "YouTube" && vid.type === "Trailer");
};

// ==========================================
// 4. PEOPLE (actor / actress, director...)
// ==========================================

export const getPopularPeople = async (page = 1) => {
  const { data } = await tmdbClient.get<TMDBResponse<Person>>("/person/popular", { params: { page } });
  return data;
};

export const getPersonDetails = async (id: string | number) => {
  const { data } = await tmdbClient.get<PersonDetails>(`/person/${id}`);
  return data;
};

export const getPersonMovieCredits = async (id: string | number) => {
  const { data } = await tmdbClient.get<{ cast: Movie[]; crew: Movie[] }>(`/person/${id}/movie_credits`);
  return data;
};

// ==========================================
// 5. SEARCH & GENRES
// ==========================================

export const searchMulti = async (query: string, page = 1) => {
  console.log(query);
  if (!query) return null;
  const { data } = await tmdbClient.get<TMDBResponse<Movie | TV | Person>>("/search/multi", {
    params: { query, page, include_adult: false },
  });
  console.log(data);
  return data;
};

export const getMovieGenres = async () => {
  const { data } = await tmdbClient.get<{ genres: Genre[] }>("/genre/movie/list");
  return data.genres;
};

export const getTVGenres = async () => {
  const { data } = await tmdbClient.get<{ genres: Genre[] }>("/genre/tv/list");
  return data.genres;
};


// ==========================================
// 6. MEDIA
// ==========================================
export const getMovieAllVideos = async (id: string | number) => {
  const { data } = await tmdbClient.get<VideosResponse>(`/movie/${id}/videos`);
  return data.results;
};

// Lấy hình ảnh (Backdrops, Posters, Logos) của phim
export const getMovieImages = async (id: string | number) => {
  const { data } = await tmdbClient.get<ImageResponse>(`/movie/${id}/images`, {
    params: { include_image_language: 'en,null' } 
  });
  return data;
};