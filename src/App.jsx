// =============================================================
// 🏗️ App.jsx - Main Application Component
// =============================================================
// TimeLock: Digital Time Capsule DApp
// Vintage Scrapbook & Postal Aesthetic
// =============================================================

import { useState, useCallback } from 'react'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import CreateCapsule from './components/CreateCapsule.jsx'
import OpenCapsule from './components/OpenCapsule.jsx'
import Notification from './components/Notification.jsx'
import VintageParticles from './components/StarBackground.jsx'

function App() {
  // ─── State Management ───
  const [walletAddress, setWalletAddress] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  // สถานะ Notification Popup
  const [notification, setNotification] = useState(null)

  // ─── Notification Helper ───
  const showNotification = useCallback((type, title, message) => {
    setNotification({ type, title, message })
  }, [])

  const dismissNotification = useCallback(() => {
    setNotification(null)
  }, [])

  return (
    <>
      {/* Vintage paper texture background */}
      <div className="app-background" />
      <VintageParticles />

      <div className="app-container">
        {/* ─── Navigation Bar ─── */}
        <Navbar
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          setProvider={setProvider}
          setSigner={setSigner}
          showNotification={showNotification}
        />

        {/* ─── Hero Section ─── */}
        <HeroSection />

        {/* ─── Section Label ─── */}
        <div className="section-label">
          <span className="section-label-text">Your Time Capsules</span>
        </div>

        {/* ─── Main Content (2-column grid) ─── */}
        <main className="main-content">
          {/* Left: Seal a New Memory */}
          <CreateCapsule
            signer={signer}
            walletAddress={walletAddress}
            showNotification={showNotification}
          />

          {/* Right: Open Your Capsule */}
          <OpenCapsule
            signer={signer}
            provider={provider}
            walletAddress={walletAddress}
            showNotification={showNotification}
          />
        </main>

        {/* ─── Footer ─── */}
        <footer className="app-footer">
          <p className="footer-text">
            TimeLock — Built with React & ethers.js on Ethereum Sepolia
          </p>
          <p className="footer-address">
            Contract: 0x6478C759CEe955d2A7FEf41736c5e9C53B1378c0
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
