// =============================================================
// 🔔 Notification.jsx - Popup Notification Modal
// =============================================================
// Popup แจ้งเตือนแบบ Overlay สำหรับแสดงสถานะต่างๆ
// Types: success, error, locked, info
// =============================================================

function Notification({ type, title, message, onDismiss }) {
  // ─── กำหนด Icon ตามประเภท ───
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '🎉'
      case 'error':
        return '⚠️'
      case 'locked':
        return '🔒'
      case 'info':
        return 'ℹ️'
      default:
        return '💬'
    }
  }

  // ─── ตรวจสอบว่ามีข้อความที่ถูกเปิดเผย (revealed text) หรือไม่ ───
  const renderMessage = () => {
    // ตรวจหา tag <revealed>...</revealed> สำหรับแสดงข้อความลับ
    const revealedMatch = message.match(/<revealed>(.*?)<\/revealed>/s)

    if (revealedMatch) {
      return (
        <div className="notification-message">
          <span>ข้อความลับของคุณคือ:</span>
          <span className="revealed-text">"{revealedMatch[1]}"</span>
        </div>
      )
    }

    return <p className="notification-message">{message}</p>
  }

  return (
    <div className="notification-overlay" onClick={onDismiss}>
      <div
        className="notification-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notification-icon">{getIcon()}</div>
        <h3 className="notification-title">{title}</h3>
        {renderMessage()}
        <button
          className="btn-dismiss"
          onClick={onDismiss}
          id="btn-dismiss-notification"
        >
          OK, Got it ✨
        </button>
      </div>
    </div>
  )
}

export default Notification
