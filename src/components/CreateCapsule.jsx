// =============================================================
// 🔒 CreateCapsule.jsx - Create Time Capsule Form
// =============================================================
// ฟอร์มสำหรับสร้างแคปซูลกาลเวลาใหม่
// - กรอกข้อความลับ (Message)
// - ตั้งเวลาล็อค (Delay in seconds)
// - ส่ง Transaction ผ่าน Smart Contract
// =============================================================

import { useState } from 'react'
import { Contract } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/config.js'

function CreateCapsule({ signer, walletAddress, showNotification }) {
  // ─── Local State ───
  const [message, setMessage] = useState('')
  const [lockDuration, setLockDuration] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [txStatus, setTxStatus] = useState(null)

  // ─── ส่ง Transaction สร้างแคปซูล ───
  const handleCreateCapsule = async () => {
    // ตรวจสอบว่าเชื่อมต่อ Wallet แล้วหรือยัง
    if (!walletAddress) {
      showNotification(
        'error',
        '🔗 Wallet Required',
        'กรุณาเชื่อมต่อ MetaMask ก่อนสร้างแคปซูล'
      )
      return
    }

    // ตรวจสอบ Input
    if (!message.trim()) {
      showNotification('error', '📝 Missing Message', 'กรุณากรอกข้อความลับที่ต้องการเก็บ')
      return
    }

    if (!lockDuration || Number(lockDuration) <= 0) {
      showNotification('error', '⏱️ Invalid Duration', 'กรุณาระบุจำนวนวินาทีที่ต้องการล็อค (มากกว่า 0)')
      return
    }

    setIsLoading(true)
    setTxStatus(null)

    try {
      // สร้าง Contract Instance ด้วย Signer (เพื่อส่ง Transaction)
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // เรียกฟังก์ชัน createCapsule บน Smart Contract
      setTxStatus({ type: 'info', text: '📡 กำลังส่ง Transaction...' })
      const tx = await contract.createCapsule(message, BigInt(lockDuration))

      // รอ Transaction ถูก Confirm บน Blockchain
      setTxStatus({ type: 'info', text: '⛏️ กำลังรอ Confirmation...' })
      await tx.wait()

      // สำเร็จ!
      setTxStatus({ type: 'success', text: '✅ สร้างแคปซูลสำเร็จ!' })
      showNotification(
        'success',
        '🎉 Capsule Created!',
        `แคปซูลถูกสร้างเรียบร้อยแล้ว! ข้อความจะถูกล็อคไว้ ${lockDuration} วินาที`
      )

      // เคลียร์ฟอร์ม
      setMessage('')
      setLockDuration('')
    } catch (error) {
      console.error('Create capsule error:', error)
      setTxStatus({ type: 'error', text: '❌ Transaction ล้มเหลว' })
      showNotification(
        'error',
        '❌ Transaction Failed',
        error?.reason || error?.message || 'เกิดข้อผิดพลาดในการสร้างแคปซูล กรุณาลองใหม่'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="glass-card" id="create-capsule-section">
      {/* ─── Card Header ─── */}
      <div className="card-header">
        <div className="card-icon">🔒</div>
        <div>
          <h2 className="card-title">Create Capsule</h2>
          <p className="card-subtitle">สร้างแคปซูลกาลเวลาใหม่</p>
        </div>
      </div>

      {/* ─── Message Input ─── */}
      <div className="form-group">
        <label className="form-label" htmlFor="input-message">
          💬 Secret Message (ข้อความลับ)
        </label>
        <textarea
          id="input-message"
          className="form-input textarea"
          placeholder="พิมพ์ข้อความลับที่ต้องการเก็บ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          rows={3}
        />
      </div>

      {/* ─── Lock Duration Input ─── */}
      <div className="form-group">
        <label className="form-label" htmlFor="input-duration">
          ⏱️ Lock Duration (ระยะเวลาล็อค - วินาที)
        </label>
        <input
          id="input-duration"
          className="form-input"
          type="number"
          placeholder="เช่น 60 = 1 นาที, 3600 = 1 ชั่วโมง"
          value={lockDuration}
          onChange={(e) => setLockDuration(e.target.value)}
          disabled={isLoading}
          min="1"
        />
      </div>

      {/* ─── Submit Button ─── */}
      <button
        id="btn-create-capsule"
        className="btn-primary"
        onClick={handleCreateCapsule}
        disabled={isLoading || !walletAddress}
      >
        {isLoading ? (
          <>
            <div className="loading-spinner" />
            Processing...
          </>
        ) : (
          <>🔐 Lock in Time Capsule</>
        )}
      </button>

      {/* ─── Transaction Status ─── */}
      {txStatus && (
        <div className={`status-message ${txStatus.type}`}>
          {txStatus.text}
        </div>
      )}
    </section>
  )
}

export default CreateCapsule
