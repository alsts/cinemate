import { useQuery } from '@tanstack/react-query';
import WebApp from '@twa-dev/sdk';
import { getMovies } from '../api/movies';

function Home() {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    retry: true,
    retryDelay: 10000, // 10 seconds
  })

  const handleVibration = () => {
    WebApp.HapticFeedback.impactOccurred('medium');
  };

  const handleInviteFriends = () => {
    WebApp.HapticFeedback.impactOccurred('medium');
    WebApp.openTelegramLink('https://t.me/share/url?url=https://t.me/CinamateBot/cinemate&text=Check out Cinemate - Your Movie Companion!');
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Cinemate</h1>
      <button
        onClick={handleVibration}
        style={{
          padding: '10px 20px',
          margin: '10px 0',
          backgroundColor: '#2481cc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Vibrate
      </button>
      <button
        onClick={handleInviteFriends}
        style={{
          padding: '10px 20px',
          margin: '10px 0 10px 10px',
          backgroundColor: '#00B87C',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Invite Friends
      </button>
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
