import { useQuery } from '@tanstack/react-query';
import WebApp from '@twa-dev/sdk';
import { getMovies } from '../api/movies';
import InteractiveMovieCard from '../components/InteractiveMovieCard';

function Home() {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    retry: true,
    retryDelay: 10000, // 10 seconds
  })

  // const handleVibration = () => {
  //   WebApp.HapticFeedback.impactOccurred('medium');
  // };

  const handleInviteFriends = () => {
    WebApp.HapticFeedback.impactOccurred('medium');
    WebApp.openTelegramLink('https://t.me/share/url?url=https://t.me/CinamateBot/cinemate&text=Check out Cinemate - Your Movie Companion!');
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="min-h-screen bg-[#1C1B33]">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-white text-2xl font-bold">Cinemate</h1>
        <button
          onClick={handleInviteFriends}
          className="bg-[#00B87C] text-white px-4 py-2 rounded-lg"
        >
          Invite Friends
        </button>
      </div>
      
      {movies && movies.length > 0 && (
        <InteractiveMovieCard
          title={movies[0].title}
          rating={movies[0].rating || 4.5}
          totalReviews={movies[0].totalReviews || 831}
          genres={movies[0].genres || ["Action", "Mystery", "Thriller"]}
          votes={movies[0].votes || 0}
          imageUrl={movies[0].imageUrl || "/placeholder.svg?height=600&width=400"}
        />
      )}
    </div>
  )
}

export default Home
