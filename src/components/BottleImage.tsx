import React from 'react'

interface BottleImageProps {
  isBolivian: boolean
  className?: string
}

const BottleImage: React.FC<BottleImageProps> = ({ isBolivian, className = "w-32 h-32" }) => {
  const coronaImage = "/images/corona-bottle.png"
  const paceñaImage = "/images/paceña-bottle.png"
  const fallbackImage = "https://images.unsplash.com/photo-1566633806327-38e9d9a2f5f3?w=200&h=200&fit=crop&crop=center"

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = fallbackImage
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={isBolivian ? paceñaImage : coronaImage}
        alt={isBolivian ? "Botella Paceña" : "Botella Corona"}
        className={`${className} object-contain drop-shadow-lg`}
        onError={handleImageError}
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  )
}

export default BottleImage
