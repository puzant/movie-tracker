export interface Movie {
  adult: boolean
  backdrop_path: string
  id: string
  original_language: string
  overview: string
  popularity: string
  vote_average: string
  vote_count: string
  release_date: string
  genre_ids: string[]
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

export interface review {
  author: string
  content: string
  id: string
  url: string
  updated_at: string
  created_at: string
}

export interface User {
  id: string
  include_adult: boolean
  name: string 
  username: string
}