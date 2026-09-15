import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_INFURA_KEY"); // Or public RPC
const publicRpc = new ethers.JsonRpcProvider("https://rpc.sepolia.org");

const CONTRACT_ADDRESS = "0x6478C759CEe955d2A7FEf41736c5e9C53B1378c0";
const abi = [
    "function capsuleCount() view returns (uint256)",
    "function capsules(uint256) view returns (string, uint256, address)"
];

async function check() {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, publicRpc);
    const count = await contract.capsuleCount();
    console.log("Capsule Count:", count.toString());

    for (let i = 0; i <= Number(count); i++) {
        try {
            const cap = await contract.capsules(i);
            console.log(`Capsule ${i}:`, cap[2]); // creator address
        } catch (e) {
            console.log(`Capsule ${i}: failed`);
        }
    }
}
check();
