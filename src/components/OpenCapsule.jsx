// =============================================================
// 🔓 OpenCapsule.jsx - Open Time Capsule Form
// =============================================================
// ฟอร์มสำหรับเปิดแคปซูลที่ถูกสร้างไว้
// - กรอก Capsule ID
// - ระบบ Try/Catch ดักจับ Error เมื่อยังไม่ถึงเวลาเปิด
// - แสดงข้อความลับเมื่อเปิดสำเร็จ
// =============================================================

import { useState } from 'react'
import { Contract } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/config.js'

function OpenCapsule({ signer, provider, walletAddress, showNotification }) {
  // ─── Local State ───
  const [capsuleId, setCapsuleId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [txStatus, setTxStatus] = useState(null)

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

    try {
      // ใช้ Provider สำหรับ Read-only call (ไม่ต้องส่ง Transaction)
      // หรือใช้ Signer ก็ได้ถ้า contract ต้องการ msg.sender
      const contractReader = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer || provider
      )

      // เรียกฟังก์ชัน openCapsule บน Smart Contract
      setTxStatus({ type: 'info', text: '📡 กำลังอ่านข้อมูลจาก Blockchain...' })
      const revealedMessage = await contractReader.openCapsule(BigInt(capsuleId))

      // สำเร็จ! แสดงข้อความที่เปิดออกมา
      setTxStatus({ type: 'success', text: '✅ เปิดแคปซูลสำเร็จ!' })
      showNotification(
        'success',
        '🎊 Capsule Opened!',
        `<revealed>${revealedMessage}</revealed>`
      )

      // เคลียร์ฟอร์ม
      setCapsuleId('')
    } catch (error) {
      console.error('Open capsule error:', error)

      // ─── ดักจับ Error: ยังไม่ถึงเวลาเปิด ───
      // Smart Contract มักจะ revert ด้วย error message
      const errorMessage = error?.reason || error?.message || ''

      // ตรวจสอบว่าเป็น Error "ยังไม่ถึงเวลา" หรือไม่
      if (
        errorMessage.toLowerCase().includes('lock') ||
        errorMessage.toLowerCase().includes('time') ||
        errorMessage.toLowerCase().includes('early') ||
        errorMessage.toLowerCase().includes('not yet') ||
        errorMessage.toLowerCase().includes('still')
      ) {
        // แจ้งเตือนว่ายังไม่ถึงเวลาเปิด
        setTxStatus({ type: 'error', text: '🔒 ยังไม่ถึงเวลาเปิด!' })
        showNotification(
          'locked',
          '🔒 Capsule is Still Locked!',
          'ยังไม่ถึงเวลาเปิดแคปซูลนี้! กรุณารอจนกว่าจะถึงเวลาที่กำหนดแล้วลองใหม่อีกครั้ง ⏳'
        )
      } else {
        // Error อื่นๆ (เช่น ID ไม่ถูกต้อง, Network error, ฯลฯ)
        setTxStatus({ type: 'error', text: '❌ เกิดข้อผิดพลาด' })
        showNotification(
          'error',
          '❌ Failed to Open',
          errorMessage || 'ไม่สามารถเปิดแคปซูลได้ กรุณาตรวจสอบ ID และลองใหม่อีกครั้ง'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="glass-card" id="open-capsule-section">
      {/* ─── Card Header ─── */}
      <div className="card-header">
        <div className="card-icon">🔓</div>
        <div>
          <h2 className="card-title">Open Capsule</h2>
          <p className="card-subtitle">เปิดแคปซูลเพื่ออ่านข้อความ</p>
        </div>
      </div>

      {/* ─── Capsule ID Input ─── */}
      <div className="form-group">
        <label className="form-label" htmlFor="input-capsule-id">
          🔢 Capsule ID (หมายเลขแคปซูล)
        </label>
        <input
          id="input-capsule-id"
          className="form-input"
          type="number"
          placeholder="เช่น 0, 1, 2, ..."
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
            Reading Blockchain...
          </>
        ) : (
          <>🔓 Open Capsule</>
        )}
      </button>

      {/* ─── Status Message ─── */}
      {txStatus && (
        <div className={`status-message ${txStatus.type}`}>
          {txStatus.text}
        </div>
      )}
    </section>
  )
}

export default OpenCapsule
