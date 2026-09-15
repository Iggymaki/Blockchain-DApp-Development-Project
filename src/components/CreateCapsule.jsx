// =============================================================
// 🔒 CreateCapsule.jsx - "Seal a New Memory" Form
// =============================================================
// ฟอร์มสร้างแคปซูลสไตล์โปสการ์ดวินเทจ
// พร้อมเอฟเฟกต์กระดาษเส้นและ stamp ตกแต่ง
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
      // สร้าง Contract Instance ด้วย Signer
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // เรียกฟังก์ชัน createCapsule บน Smart Contract
      setTxStatus({ type: 'info', text: '📡 Sending transaction to the blockchain...' })
      const tx = await contract.createCapsule(message, BigInt(lockDuration))

      // รอ Transaction ถูก Confirm
      setTxStatus({ type: 'info', text: '⛏️ Awaiting confirmation on Sepolia...' })
      await tx.wait()

      // สำเร็จ!
      setTxStatus({ type: 'success', text: '✅ Your time capsule has been sealed!' })
      showNotification(
        'success',
        '🎉 Memory Sealed!',
        `Your secret has been locked away for ${lockDuration} seconds. It now lives immutably on the blockchain.`
      )

      // เคลียร์ฟอร์ม
      setMessage('')
      setLockDuration('')
    } catch (error) {
      console.error('Create capsule error:', error)
      setTxStatus({ type: 'error', text: '❌ Transaction failed' })
      showNotification(
        'error',
        '❌ Sealing Failed',
        error?.reason || error?.message || 'Something went wrong while sealing your capsule. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="vintage-card" id="create-capsule-section">
      {/* Decorative stamp in corner */}
      <div className="card-stamp">🔒</div>

      {/* ─── Card Header ─── */}
      <div className="card-header">
        <div className="card-header-label">Section I</div>
        <h2 className="card-title">Seal a New Memory</h2>
        <p className="card-subtitle">Write your secret and lock it in time</p>
      </div>

      {/* ─── Message Input (lined paper) ─── */}
      <div className="form-group">
        <label className="form-label" htmlFor="input-message">
          Secret Message
          <span className="form-label-hint">— your words, preserved forever</span>
        </label>
        <textarea
          id="input-message"
          className="form-input textarea"
          placeholder="Dear future self..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          rows={4}
        />
      </div>

      {/* ─── Lock Duration Input ─── */}
      <div className="form-group">
        <label className="form-label" htmlFor="input-duration">
          Unlock Delay
          <span className="form-label-hint">— in seconds (60 = 1 min, 3600 = 1 hr)</span>
        </label>
        <input
          id="input-duration"
          className="form-input"
          type="number"
          placeholder="e.g. 120"
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
            Sealing your memory...
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
