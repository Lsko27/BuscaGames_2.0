"use client"

import { Star, StarHalf } from "lucide-react"

interface RatingStarsProps {
  rating: number
  maxStars?: number
  className?: string
}

const RatingStars = ({ rating, maxStars = 5, className }: RatingStarsProps) => {
  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const starValue = i + 1
        if (rating >= starValue) {
          return (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          )
        } else if (rating >= starValue - 0.5) {
          return (
            <StarHalf
              key={i}
              className="h-5 w-5 fill-yellow-400 text-yellow-400"
            />
          )
        } else {
          return <Star key={i} className="h-5 w-5 text-yellow-400" />
        }
      })}
      <span className="ml-1 text-sm text-gray-300">{rating.toFixed(1)}</span>
    </div>
  )
}

export default RatingStars
