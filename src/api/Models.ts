export interface IMovie {
  adult: boolean
  backdrop_path: string
  id: string
  original_language: string
  overview: string
  popularity: string
  vote_average: string
  vote_count: string
  release_date: string
  genres: MovieGenre[]
  poster_path: string
  title: string
  runtime: number
  credits: {
    cast: Actor[]
  }
  status: string
  tagline: string
  recommendations: {
    results: IMovie[]
  }
}

export interface MovieGenre {
  id: number 
  name: string
}

export interface Actor {
  id: number
  cast_id: number
  name: string
  original_name: string
  popularity: number
  profile_path: string
  character: string
}

export interface Review {
  author: string
  content: string
  id: string
  url: string
  updated_at: string
  created_at: string
}

export interface User {
  avatar: {
    gravatar: {
      hash: string
    }
  }
  id: string
  include_adult: boolean
  name: string 
  username: string
}

export interface FavoriteMovies {
  page: number
  results: IMovie[]
  totalPages: number 
  total_results: number 
}