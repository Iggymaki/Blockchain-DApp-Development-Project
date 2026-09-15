// =============================================================
// 🌟 HeroSection.jsx - Hero Banner
// =============================================================
// ส่วนหัวข้อหลักของหน้า แสดงชื่อ DApp และคำอธิบาย
// =============================================================

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-icon">🔮</div>
      <h1 className="hero-title">
        <span className="gradient-text">Digital Time Capsule</span>
        <br />
        แคปซูลกาลเวลาดิจิทัล
      </h1>
      <p className="hero-desc">
        เก็บข้อความลับไว้บน Blockchain แล้วล็อคมันไว้ด้วยเวลา
        ไม่มีใครเปิดอ่านได้จนกว่าจะถึงเวลาที่กำหนด — ปลอดภัย โปร่งใส ไม่สามารถแก้ไขได้
      </p>
    </section>
  )
}

export default HeroSection
