// =============================================================
// ✨ VintageParticles.jsx - Floating Dust Motes & Paper Specks
// =============================================================
// สร้างพื้นหลังอนุภาคแบบฝุ่นกระดาษวินเทจ
// เพิ่มความรู้สึกของสมุดเก่าและแสงส่องผ่านหน้าต่าง
// =============================================================

import { useMemo } from 'react'

function VintageParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 4}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 10}s`,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  }, [])

  return (
    <div className="vintage-particles-layer">
      {particles.map((p) => (
        <div
          key={p.id}
          className="vintage-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default VintageParticles
