import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export interface Movie {
  id: number
  title: string
  // Add more movie properties based on your Go backend
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
