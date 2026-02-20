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

export interface TV{
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
    vote_average: string;
    vote_count: string;
}

export interface People {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
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

export interface Cast {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[]
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
    order: number;
    media_type: string;
}

export interface Crew {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credit_id: string;
    department: string | null;
    job: string | null;
    media_type: string | null;
}

export interface Job {
    department: string;
    jobs: string[];
}

export interface TMDBResponse<T>{
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}