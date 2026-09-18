// =============================================================
// 🔔 Notification.jsx - Vintage Telegram Modal
// =============================================================
// Popup แจ้งเตือนสไตล์โทรเลขวินเทจ
// Types: success, error, locked, info
// พร้อม Envelope Animation สำหรับเปิดแคปซูลสำเร็จ
// =============================================================

function Notification({ type, title, message, onDismiss }) {
  // ─── ตรวจสอบว่าเป็นข้อความที่มี Transaction Hash หรือไม่ ───
  const txMatch = message.match(/<tx>(.*?)<\/tx>/s)
  const txHash = txMatch ? txMatch[1] : null

  // ─── ตรวจสอบว่าเป็นข้อความที่เปิดเผยจาก Capsule หรือไม่ ───
  const revealedMatch = message.match(/<revealed>(.*?)<\/revealed>/s)
  const isRevealed = !!revealedMatch

  // ข้อความหลักโดยลบแท็กพิเศษออก
  const displayMessage = message
    .replace(/<tx>(.*?)<\/tx>/s, '')
    .replace(/<revealed>(.*?)<\/revealed>/s, '')
    .trim()

  // ─── กำหนด Icon ตามประเภท ───
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <img
            src="/metamask-logo.png"
            alt="MetaMask"
            className="notification-metamask-logo"
          />
        )
      case 'error':
        return '⚠️'
      case 'locked':
        return '🔒'
      case 'info':
        return 'ℹ️'
      default:
        return (
          <img
            src="/metamask-logo.png"
            alt="MetaMask"
            className="notification-metamask-logo"
          />
        )
    }
  }

  // ─── Render: Envelope Animation (สำหรับ revealed message) ───
  if (isRevealed) {
    return (
      <div className="notification-overlay" onClick={onDismiss}>
        <div
          className="notification-card notification-card--envelope"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Envelope Animation */}
          <div className="envelope-wrapper">
            <div className="envelope">
              <div className="envelope-flap" />
              <div className="envelope-letter">
                <div className="envelope-letter-header">
                  <span className="envelope-letter-seal">✦</span>
                  <span className="envelope-letter-label">Unsealed Memory</span>
                  <span className="envelope-letter-seal">✦</span>
                </div>
                <p className="envelope-letter-text">{revealedMatch[1]}</p>
                <div className="envelope-letter-footer">
                  — from your past self
                </div>
              </div>
              <div className="envelope-body" />
            </div>
          </div>

          <button
            className="btn-dismiss"
            onClick={onDismiss}
            id="btn-dismiss-notification"
            style={{ marginTop: '1.5rem' }}
          >
            Close Letter ✦
          </button>
        </div>
      </div>
    )
  }

  // ─── Render: Default Notification (ปกติ) ───
  return (
    <div className="notification-overlay" onClick={onDismiss}>
      <div
        className="notification-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notification-icon">{getIcon()}</div>
        <h3 className="notification-title">{title}</h3>
        <p className="notification-message">{displayMessage}</p>

        {txHash && (
          <div className="notification-tx-box">
            <span className="notification-tx-label">Transaction ID:</span>{' '}
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="notification-tx-hash"
              title="View on Sepolia Etherscan"
            >
              {txHash.slice(0, 10)}...{txHash.slice(-8)} ↗
            </a>
          </div>
        )}

        <button
          className="btn-dismiss"
          onClick={onDismiss}
          id="btn-dismiss-notification"
        >
          Understood ✦
        </button>
      </div>
    </div>
  )
}

export default Notification
