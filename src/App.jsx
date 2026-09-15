// =============================================================
// 🏗️ App.jsx - Main Application Component
// =============================================================
// Digital Time Capsule DApp - คอมโพเนนต์หลักของแอปพลิเคชัน
// รวมทุก Component และจัดการ State กลาง
// =============================================================

import { useState, useCallback } from 'react'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import CreateCapsule from './components/CreateCapsule.jsx'
import OpenCapsule from './components/OpenCapsule.jsx'
import Notification from './components/Notification.jsx'
import StarBackground from './components/StarBackground.jsx'

function App() {
  // ─── State Management ───
  // สถานะ Wallet (MetaMask)
  const [walletAddress, setWalletAddress] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  // สถานะ Notification Popup
  const [notification, setNotification] = useState(null)

  // ─── Notification Helper ───
  // ฟังก์ชันสำหรับแสดงข้อความแจ้งเตือน (popup)
  const showNotification = useCallback((type, title, message) => {
    setNotification({ type, title, message })
  }, [])

  const dismissNotification = useCallback(() => {
    setNotification(null)
  }, [])

  return (
    <>
      {/* พื้นหลังแบบ Gradient + Animated Orbs */}
      <div className="app-background" />
      <StarBackground />

      <div className="app-container">
        {/* ─── Navigation Bar ─── */}
        <Navbar
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          setProvider={setProvider}
          setSigner={setSigner}
          showNotification={showNotification}
        />

        {/* ─── Hero Section (หัวข้อหลัก) ─── */}
        <HeroSection />

        {/* ─── Main Content (2-column grid) ─── */}
        <main className="main-content">
          {/* ฝั่งซ้าย: สร้างแคปซูล */}
          <CreateCapsule
            signer={signer}
            walletAddress={walletAddress}
            showNotification={showNotification}
          />

          {/* ฝั่งขวา: เปิดแคปซูล */}
          <OpenCapsule
            signer={signer}
            provider={provider}
            walletAddress={walletAddress}
            showNotification={showNotification}
          />
        </main>

        {/* ─── Footer ─── */}
        <footer className="app-footer">
          <p>
            ⛓️ Digital Time Capsule — Built with React + ethers.js on Ethereum
          </p>
        </footer>
      </div>

      {/* ─── Notification Popup Overlay ─── */}
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onDismiss={dismissNotification}
        />
      )}
    </>
  )
}

export default App
