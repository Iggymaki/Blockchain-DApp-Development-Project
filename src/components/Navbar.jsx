// =============================================================
// 🧭 Navbar.jsx - Navigation Bar + Wallet Connect
// =============================================================
// แถบนำทางด้านบน พร้อมปุ่ม Connect Wallet (MetaMask)
// ใช้ ethers.js v6 BrowserProvider สำหรับเชื่อมต่อ
// =============================================================

import { useState } from 'react'
import { BrowserProvider } from 'ethers'

function Navbar({ walletAddress, setWalletAddress, setProvider, setSigner, showNotification }) {
  const [isConnecting, setIsConnecting] = useState(false)

  // ─── ฟังก์ชันย่อ Address ให้สั้นลง ───
  // เช่น 0x1234567890ABCDEF... → 0x1234...CDEF
  const shortenAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // ─── เชื่อมต่อ MetaMask Wallet ───
  const connectWallet = async () => {
    // ตรวจสอบว่ามี MetaMask ติดตั้งหรือไม่
    if (!window.ethereum) {
      showNotification(
        'error',
        '🦊 MetaMask Not Found',
        'กรุณาติดตั้ง MetaMask Extension ก่อนใช้งาน DApp นี้'
      )
      return
    }

    setIsConnecting(true)

    try {
      // สร้าง Provider จาก MetaMask (ethers.js v6)
      const browserProvider = new BrowserProvider(window.ethereum)

      // ขอ Permission เข้าถึง Accounts
      const accounts = await browserProvider.send('eth_requestAccounts', [])

      // ดึง Signer สำหรับส่ง Transaction
      const walletSigner = await browserProvider.getSigner()

      // อัปเดต State
      setProvider(browserProvider)
      setSigner(walletSigner)
      setWalletAddress(accounts[0])

      showNotification(
        'success',
        '✅ Connected!',
        `เชื่อมต่อ Wallet สำเร็จ: ${shortenAddress(accounts[0])}`
      )
    } catch (error) {
      console.error('Wallet connection error:', error)
      showNotification(
        'error',
        '❌ Connection Failed',
        'ไม่สามารถเชื่อมต่อ MetaMask ได้ กรุณาลองใหม่อีกครั้ง'
      )
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <nav className="navbar">
      {/* ─── Brand / Logo ─── */}
      <div className="navbar-brand">
        <div className="navbar-logo">⏳</div>
        <div>
          <div className="navbar-title">Time Capsule</div>
          <div className="navbar-subtitle">Blockchain DApp</div>
        </div>
      </div>

      {/* ─── Connect Wallet Button ─── */}
      <button
        id="btn-connect-wallet"
        className={`btn-connect ${walletAddress ? 'connected' : ''}`}
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <div className="loading-spinner" />
            <span>Connecting...</span>
          </>
        ) : walletAddress ? (
          <>
            <div className="wallet-dot" />
            <span>{shortenAddress(walletAddress)}</span>
          </>
        ) : (
          <>
            🦊 <span>Connect Wallet</span>
          </>
        )}
      </button>
    </nav>
  )
}

export default Navbar
