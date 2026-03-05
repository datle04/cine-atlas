import { StyledString } from "next/dist/build/swc/types";

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string; 
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieDetails extends Movie {
    runtime: number;
    revenue: number;
    status: string;
    tagline: string;
    imdb_id: string;
    budget: number;
    genres: Genre[];
    homepage: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
    } | null;
    production_companies: ProductionCompany[];
    production_countries: Production_Country[];
    spoken_languages: SpokenLanguage[];
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface Production_Country{
    iso_3166_1: string;
    name: string | null;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string | null;
}


export interface TV{
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: string;
    media_type: string | null;
}

export interface TVDetails extends TV {
    air_date: string;
    created_by: CreatedBy[];
    episode_run_time: number[];
    genres: Genre[];
    homepage: string | null;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: Episode;
    next_episode_to_air: Episode | null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: ProductionCompany[];
    production_countries: Production_Country[];
    seasons: (Omit<TVSeason, "episodes" | "networks"> & {
        episode_count: number;
    })[]
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
}

export interface TVSeason {
    _id: string;
    air_date: string;
    episodes: Episode[];
    name: string;
    networks: Network[];
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export interface TVEpisodeGroups {
    description: string;
    episode_count: number;
    group_count: number;
    groups: {
        id: string;
        name: string;
        order: number | 0;
        episodes: Episode[];
        locked: boolean;
    }[];
    id: string;
    name: string;
    network: Network;
    type: number | 0;
}

export interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
}

export interface Network {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
    headquarters: string | null;
    homepage: string | null;
}

export interface Episode {
    air_date: string;
    crew: Crew[];
    episode_number: number;
    guest_stars: GuestStar[];
    name: string;
    overview: string;
    id: number;
    production_code: string;
    runtime: number;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}

export interface GuestStar {
    character: string;
    credit_id: string;
    order: number;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export interface Person {
    adult: boolean;
    id: number;
    name: string;
    original_name: string;
    media_type: string;
    popularity: number;
    gender: number;
    known_for_department: string;
    profile_path: string;
    known_for: {
        adult: boolean;
        backdrop_path: string;
        id: number;
        title: string;
        original_language: string;
        original_title: string;
        overview: string;
        poster_path: string;
        media_type: string;
        genre_ids: number[];
        popularity: number;
        release_date: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }[];
}

export interface PersonDetails extends Omit<Person, "known_for" | "media_type" | "original_name"> {
    also_known_as: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    homepage: string | null;
    imdb_id: string;
    place_of_birth: string;
}

export interface PeopleImage {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface BaseCastCrew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
}

export interface Cast extends BaseCastCrew {
    cast_id: number;
    character: string;
    order: number;
}

export interface Crew extends BaseCastCrew {
    department: string;
    job: string;
    credit_id: string;
}

export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export interface Job {
    department: string;
    jobs: string[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface Review {
    id: string;
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string | null;
        rating: number | null;
    }
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
    iso_639_1: string | null;
    media_id: number | 0;
    media_title: string | null;
    media_type: string;
}

export interface Collection {
    id: number | 0;
    name: string;
    original_language: string;
    original_name: string;
    overview: string | null;
    poster_path: string | null;
    backdrop_path: string | null;
    parts: {
        adult: boolean;
        backdrop_path: string | null;
        id: number;
        name: string;
        original_name: string;
        overview: string;
        poster_path: string;
        media_type: string;
        original_language: string;
        genre_ids: number[];
        popularity: number;
        release_date: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }[];
}

export interface Company {
    description: string;
    headquarters: string;
    homepage: string;
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
    parent_company: string;  
}

export interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string; 
    site: string; 
    size: number;
    type: string; // "Trailer", "Teaser", "Behind the Scenes", etc.
    official: boolean;
    published_at: string;
    id: string;
}

export interface Keyword {
    id: number | 0;
    name: string;
}

export interface ImageItem {
    aspect_ratio: number | 0;
    height: number | 0;
    iso_639_1: string;
    file_path: string;
    vote_average: number | 0;
    vote_count: number | 0;
    width: number | 0;
}

export interface ImageResponse {
    id: number;
    backdrops: ImageItem[];
    logos: ImageItem[];
    posters: ImageItem[];
}


export interface VideosResponse {
    id: number;
    results: Video[];
}

export interface KeywordsResponse {
    id: number | 0;
    keywords: Keyword[];
}

export interface ReviewsResponse {
    page: number;
    id: number;
    results: (Omit<Review, "iso_639_1" | "media_id" | "media_title" | "media_type">)[];
    total_pages: number;
    total_results: number;
}

export interface TMDBResponse<T>{
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

