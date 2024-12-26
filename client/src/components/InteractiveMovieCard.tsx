'use client'

import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { Heart, Info, Play, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

interface MovieCardProps {
  title: string
  rating: number
  totalReviews: number
  genres: string[]
  votes: number
  imageUrl: string
  onSwipe: (liked: boolean) => void
}

export default function InteractiveMovieCard({
  title = "Carry-On",
  rating = 4.5,
  totalReviews = 831,
  genres = ["Action", "Mystery", "Thriller"],
  votes = 0,
  imageUrl = "/placeholder.svg?height=600&width=400",
  onSwipe,
}: MovieCardProps) {
  const [exitX, setExitX] = useState<number | null>(null)

  // Motion values for drag gesture
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(
    [x, y],
    (latest: number[]) => latest[0] * 0.05 + latest[1] * 0.05
  )
  const opacity = useTransform(
    [x, y],
    (latest: number[]) => 1 - Math.abs(latest[0] * 0.002) - Math.abs(latest[1] * 0.002)
  )

  // 3D effect transforms
  const rotateX = useTransform(y, [-300, 300], [10, -10])
  const rotateY = useTransform(x, [-300, 300], [-10, 10])
  const scale = useTransform([x, y], (latest: number[]) => {
    const distance = Math.sqrt(latest[0] ** 2 + latest[1] * 2)
    return 1 - Math.min(distance * 0.0005, 0.1)
  })

  // Controls for the card exit animation
  const controls = useAnimation()

  // Transform values for like/dislike icons
  const likeOpacity = useTransform(x, [0, 150], [0, 1])
  const dislikeOpacity = useTransform(x, [-150, 0], [1, 0])

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 150 // Increased threshold for more intentional swipes
    const velocity = Math.abs(info.velocity.x)
    const direction = info.velocity.x < 0 ? -1 : 1
    const isSwipe = velocity >= 400 || Math.abs(info.offset.x) >= threshold

    if (isSwipe) {
      const liked = direction > 0
      const exitDistance = direction * (window.innerWidth + 200) // Add extra distance for smoother exit
      controls.start({
        x: exitDistance,
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: [0.32, 0.72, 0.35, 1.0], // Custom ease curve for smooth exit
        }
      }).then(() => {
        setExitX(exitDistance)
        onSwipe(liked)
      })
    } else {
      // Spring back to center with gentler bounce
      controls.start({
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.6
        }
      })
    }
  }

  if (exitX) {
    return (
      <div className="text-white text-center mt-8">
        {exitX > 0 ? "Liked!" : "Passed!"}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4 grid justify-items-center align-items-center touch-none overflow-hidden">
      {/* Votes counter at the very top */}
      <div className="absolute top-4 z-10">
        <div className="bg-[#9333EA] text-white px-6 py-1 rounded-full text-sm font-medium">
          {votes} votes
        </div>
      </div>

      <div className="relative w-full max-w-[340px] h-[480px] perspective-1000 pt-20">
        {/* Like/Dislike icons on the sides of the screen */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center"
          style={{ opacity: dislikeOpacity, x: -60 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#2D2B45]/80 backdrop-blur-md flex items-center justify-center">
            <X className="h-8 w-8 text-[#EC4899]" />
          </div>
        </motion.div>

        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center"
          style={{ opacity: likeOpacity, x: 60 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#2D2B45]/80 backdrop-blur-md flex items-center justify-center">
            <Heart className="h-8 w-8 text-[#3B82F6]" />
          </div>
        </motion.div>

        {/* Interactive Movie Card */}
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.7} // Made more elastic for smoother drag
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{
            x,
            y,
            rotateX,
            rotateY,
            rotate,
            scale,
            opacity,
          }}
          whileTap={{ cursor: "grabbing" }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            restDelta: 0.5
          }}
        >
          <div className="bg-[grey] rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            {/* Movie poster */}
            <div className="relative overflow-hidden">
              <img
                src={imageUrl}
                alt={title}
                draggable="false"
                className="w-full aspect-[3/4] object-cover select-none pointer-events-none"
              />

              {/* Netflix badge */}
              <div className="absolute top-3 left-3 flex gap-1">
                <div className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">N</div>
              </div>

              {/* Genre tags */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex flex-wrap gap-1">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Movie title and rating */}
            <div className="p-4 space-y-2 bg-gradient-to-b from-[#2D2B45] to-[#1C1B33]">
              <h3 className="text-white text-xl font-bold">{title}</h3>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < Math.floor(rating) ? "text-red-500" : "text-gray-600"
                        }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">({totalReviews})</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1C1B33]">
        <div className="flex justify-center max-w-[280px] mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-[#2D2B45] text-[#9333EA] hover:bg-[#2D2B45]/80 mx-2"
          >
            <Play className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-[#2D2B45] text-[#10B981] hover:bg-[#2D2B45]/80 mx-2"
          >
            <Info className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
