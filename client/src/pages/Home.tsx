import { useQuery } from '@tanstack/react-query'
import { getMovies } from '../api/movies'

function Home() {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    retry: true,
    retryDelay: 10000, // 10 seconds
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Cinemate</h1>
      <div>
        {movies?.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            {/* Add more movie details here */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
