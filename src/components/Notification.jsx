// =============================================================
// 🔔 Notification.jsx - Vintage Telegram Modal
// =============================================================
// Popup แจ้งเตือนสไตล์โทรเลขวินเทจ
// Types: success, error, locked, info
// =============================================================

function Notification({ type, title, message, onDismiss }) {
  // ─── กำหนด Icon ตามประเภท ───
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '📬'
      case 'error':
        return '⚠️'
      case 'locked':
        return '🔒'
      case 'info':
        return 'ℹ️'
      default:
        return '✉️'
    }
  }

  // ─── Render message — handle <revealed> tag ───
  const renderMessage = () => {
    const revealedMatch = message.match(/<revealed>(.*?)<\/revealed>/s)

    if (revealedMatch) {
      return (
        <div className="notification-message">
          <span>Your sealed message reads:</span>
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
          Understood ✦
        </button>
      </div>
    </div>
  )
}

export default Notification
