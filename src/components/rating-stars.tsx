import { useState } from 'react';

interface ICustomRatingStars {
  count?: number;
  value: number;
  size?: number;
  color_filled: string;
  edit?: boolean;
  onChange?: (newRating: number) => void;
  className?: string;
}

export function RatingStars({ 
  color_filled,
  count = 5,
  size = 25,
  value,
  edit = false,
  onChange,
  className
}: ICustomRatingStars) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: count }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoveredRating || value);

        return (
          <svg
            className={className}
            key={index}
            onMouseEnter={() => edit && setHoveredRating(starValue)}
            onMouseLeave={() => edit && setHoveredRating(0)}
            onClick={() => edit && onChange?.(starValue)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={{
              fill: isFilled ? color_filled : 'none',
              cursor: edit ? 'pointer' : 'default',
              stroke: isFilled ? 'none' : color_filled,
              strokeWidth: 1
            }}
          >
            <polygon points="12 2 15 8 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8" />
          </svg>
        );
      })}
    </div>
  );
}
