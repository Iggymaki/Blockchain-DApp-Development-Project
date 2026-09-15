// =============================================================
// 📌 Smart Contract Configuration
// =============================================================
// ✅ Contract ถูก Deploy บน Sepolia Testnet เรียบร้อยแล้ว
// Address และ ABI ด้านล่างตรงกับ Contract จริงบน Blockchain
// =============================================================

// 🔗 Contract Address (Deployed on Sepolia Testnet)
export const CONTRACT_ADDRESS = "0x6478C759CEe955d2A7FEf41736c5e9C53B1378c0";

// 📜 Contract ABI - ตรงกับ TimeCapsule Contract ที่ Deploy แล้ว
export const CONTRACT_ABI = [
  // ฟังก์ชัน createCapsule: สร้างแคปซูลกาลเวลาใหม่
  // - _message: ข้อความลับที่ต้องการเก็บ
  // - _unlockDelayInSeconds: จำนวนวินาทีที่ต้องการล็อค
  {
    "inputs": [
      { "internalType": "string", "name": "_message", "type": "string" },
      { "internalType": "uint256", "name": "_unlockDelayInSeconds", "type": "uint256" }
    ],
    "name": "createCapsule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },

  // ฟังก์ชัน capsuleCount: ดูจำนวนแคปซูลทั้งหมดที่ถูกสร้าง
  {
    "inputs": [],
    "name": "capsuleCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  // ฟังก์ชัน capsules: ดูข้อมูลแคปซูลตาม ID (mapping)
  // - returns: message, unlockTime, creator
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "capsules",
    "outputs": [
      { "internalType": "string", "name": "message", "type": "string" },
      { "internalType": "uint256", "name": "unlockTime", "type": "uint256" },
      { "internalType": "address", "name": "creator", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },

  // ฟังก์ชัน openCapsule: เปิดแคปซูลเพื่ออ่านข้อความลับ
  // - _id: ID ของแคปซูลที่ต้องการเปิด
  // - returns: ข้อความลับ (string)
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "openCapsule",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
