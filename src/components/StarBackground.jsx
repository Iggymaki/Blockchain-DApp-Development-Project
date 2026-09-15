// =============================================================
// ⭐ StarBackground.jsx - Animated Star Particles
// =============================================================
// สร้างพื้นหลังดาวกระพริบเพื่อเพิ่มความสวยงามให้ UI
// =============================================================

import { useMemo } from 'react'

function StarBackground() {
  // สร้างตำแหน่งดาวแบบสุ่ม 40 ดวง
  const stars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 2}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 4}s`,
    }))
  }, [])

  return (
    <div className="stars-layer">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}

export default StarBackground
