import { useQuery } from '@tanstack/react-query';
// import WebApp from '@twa-dev/sdk';
import { getMovies } from '../api/movies';
import InteractiveMovieCard from '../components/InteractiveMovieCard';
import { useState } from 'react';

function Home() {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedMovies, setLikedMovies] = useState<Record<string, boolean>>({});

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!movies || movies.length === 0) return <div>No movies found</div>

  const handleSwipe = (movieId: number, liked: boolean) => {
    setLikedMovies(prev => ({ ...prev, [movieId]: liked }));
    setCurrentIndex(prev => Math.min(prev + 1, movies.length - 1));
  };

  const currentMovie = movies[currentIndex];

  return (
    <div className="min-h-screen bg-[#1C1B33]">
      {currentMovie && (
        <InteractiveMovieCard
          key={currentMovie.id} 
          title={currentMovie.title}
          rating={currentMovie.rating || 4.5}
          totalReviews={currentMovie.totalReviews || 831}
          genres={currentMovie.genres || ["Action", "Mystery", "Thriller"]}
          votes={currentMovie.votes || 0}
          imageUrl={currentMovie.imageUrl || "https://placehold.co/400x600/1C1B33/ffffff?text=No+Image'"}
          onSwipe={(liked) => handleSwipe(currentMovie.id, liked)}
        />
      )}
      
      {/* Debug info */}
      <div className="fixed bottom-4 left-4 text-white text-sm">
        <div>Current Index: {currentIndex + 1}/{movies.length}</div>
        <div>Liked Movies: {Object.entries(likedMovies).filter(([_, liked]) => liked).length}</div>
      </div>
    </div>
  );
}

export default Home
