// =============================================================
// 🔓 OpenCapsule.jsx - "Open Your Capsule" Section
// =============================================================
// ฟอร์มเปิดแคปซูลสไตล์จดหมายเปิดผนึก
// แสดงข้อความที่เปิดเผยออกมาในกล่องสไตล์จดหมายเก่า
// =============================================================

import { useState } from 'react'
import { Contract } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/config.js'

function OpenCapsule({ signer, provider, walletAddress, showNotification }) {
  // ─── Local State ───
  const [capsuleId, setCapsuleId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [txStatus, setTxStatus] = useState(null)
  const [revealedMessage, setRevealedMessage] = useState(null)

  // ─── เปิดแคปซูลตาม ID ───
  const handleOpenCapsule = async () => {
    // ตรวจสอบว่าเชื่อมต่อ Wallet แล้วหรือยัง
    if (!walletAddress) {
      showNotification(
        'error',
        '🔗 Wallet Required',
        'กรุณาเชื่อมต่อ MetaMask ก่อนเปิดแคปซูล'
      )
      return
    }

    // ตรวจสอบ Input
    if (capsuleId === '' || Number(capsuleId) < 0) {
      showNotification('error', '🔢 Invalid ID', 'กรุณาระบุ Capsule ID ที่ถูกต้อง')
      return
    }

    setIsLoading(true)
    setTxStatus(null)
    setRevealedMessage(null)

    try {
      const contractReader = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer || provider
      )

      // เรียกฟังก์ชัน openCapsule
      setTxStatus({ type: 'info', text: '📡 Reading from the blockchain...' })
      const message = await contractReader.openCapsule(BigInt(capsuleId))

      // สำเร็จ! แสดงข้อความ
      setTxStatus({ type: 'success', text: '✅ Capsule unsealed successfully!' })
      setRevealedMessage(message)
      showNotification(
        'success',
        '🎊 Capsule Opened!',
        `<revealed>${message}</revealed>`
      )

      setCapsuleId('')
    } catch (error) {
      console.error('Open capsule error:', error)

      const errorMessage = error?.reason || error?.message || ''

      // ─── ดักจับ Error: ยังไม่ถึงเวลาเปิด ───
      if (
        errorMessage.toLowerCase().includes('lock') ||
        errorMessage.toLowerCase().includes('time') ||
        errorMessage.toLowerCase().includes('early') ||
        errorMessage.toLowerCase().includes('not yet') ||
        errorMessage.toLowerCase().includes('still')
      ) {
        setTxStatus({ type: 'error', text: '🔒 This capsule is still sealed!' })
        showNotification(
          'locked',
          '🔒 Still Locked',
          'This time capsule hasn\'t reached its unlock date yet. Please wait and try again later. ⏳'
        )
      } else {
        setTxStatus({ type: 'error', text: '❌ Could not open capsule' })
        showNotification(
          'error',
          '❌ Failed to Open',
          errorMessage || 'Unable to open this capsule. Please check the ID and try again.'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="vintage-card" id="open-capsule-section">
      {/* Decorative stamp in corner */}
      <div className="card-stamp">🔓</div>

      {/* ─── Card Header ─── */}
      <div className="card-header">
        <div className="card-header-label">Section II</div>
        <h2 className="card-title">Open Your Capsule</h2>
        <p className="card-subtitle">Unseal a memory from the past</p>
      </div>

      {/* ─── Capsule ID Input ─── */}
      <div className="form-group">
        <label className="form-label" htmlFor="input-capsule-id">
          Capsule ID
          <span className="form-label-hint">— the number of your sealed memory</span>
        </label>
        <input
          id="input-capsule-id"
          className="form-input"
          type="number"
          placeholder="e.g. 0, 1, 2..."
          value={capsuleId}
          onChange={(e) => setCapsuleId(e.target.value)}
          disabled={isLoading}
          min="0"
        />
      </div>

      {/* ─── Open Button ─── */}
      <button
        id="btn-open-capsule"
        className="btn-primary"
        onClick={handleOpenCapsule}
        disabled={isLoading || !walletAddress}
      >
        {isLoading ? (
          <>
            <div className="loading-spinner" />
            Unsealing...
          </>
        ) : (
          <>🔓 Open Time Capsule</>
        )}
      </button>

      {/* ─── Transaction Status ─── */}
      {txStatus && (
        <div className={`status-message ${txStatus.type}`}>
          {txStatus.text}
        </div>
      )}

      {/* ─── Revealed Message (Opened Letter Display) ─── */}
      {revealedMessage && (
        <div className="revealed-letter">
          <p className="revealed-letter-text">{revealedMessage}</p>
        </div>
      )}
    </section>
  )
}

export default OpenCapsule
