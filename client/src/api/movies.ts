import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://cinemate-backend-iz6i.onrender.com/api'
    : 'http://localhost:3000/api',
})

export interface Movie {
  id: number
  title: string
  rating: number
  totalReviews: number
  genres: string[]
  votes: number
  imageUrl: string
}

export const getMovies = async (): Promise<Movie[]> => {
  const response = await api.get<Movie[]>('/movies')
  return response.data
}

export const getMovie = async (id: number): Promise<Movie> => {
  const response = await api.get<Movie>(`/movies/${id}`)
  return response.data
}

// Add more API functions as needed
