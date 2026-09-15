// =============================================================
// 🌟 HeroSection.jsx - Elegant Scrapbook Hero Banner
// =============================================================
// ส่วนหัวข้อหลักสไตล์ Vintage Scrapbook พร้อมตกแต่ง
// ด้วยองค์ประกอบแบบไปรษณีย์และ Polaroid
// =============================================================

function HeroSection() {
  return (
    <section className="hero-section">
      {/* Decorative scattered postal elements */}
      <div className="hero-decorations">
        <span className="deco-stamp">✉️</span>
        <span className="deco-stamp">📮</span>
        <span className="deco-stamp">🕰️</span>
        <span className="deco-stamp">🔏</span>
      </div>

      {/* Stamp label */}
      <div className="hero-stamp">
        Sepolia Testnet • Ethereum
      </div>

      {/* Main heading */}
      <h1 className="hero-title">
        TimeLock
        <br />
        <span className="hero-title-accent">Digital Time Capsule</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle">
        Seal your memories in time-locked capsules on the Ethereum blockchain.
        Immutable, transparent, and beautifully preserved — until the moment arrives to unseal them.
      </p>

      {/* Decorative divider */}
      <div className="hero-divider">
        ✦
      </div>
    </section>
  )
}

export default HeroSection
