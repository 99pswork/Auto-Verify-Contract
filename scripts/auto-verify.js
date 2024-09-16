const { ethers } = require("ethers");
const hre = require("hardhat");

// Provider - Replace with your WebSocket provider (e.g., Alchemy, Infura)
const provider = new ethers.providers.WebSocketProvider("wss://eth-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY");

// Contract ABI (Replace with the actual ABI of your contract)
const contractABI = [
  // Replace this with the ABI of the contract you want to track
  "event YourEventName(uint256 indexed someValue, address indexed sender)", // Example event
];

// Deployed contract address (replace with your contract's address)
const contractAddress = "0xYourDeployedContractAddress";

// Initialize contract instance with ABI and provider
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Listen for events emitted by the contract
contract.on("YourEventName", async (someValue, sender) => {
  console.log(`Event detected: YourEventName emitted with value: ${someValue}, sender: ${sender}`);

  // Trigger the contract verification when the event is emitted
  await verifyContract(contractAddress, [ /* Constructor Arguments */ ]);
});

// Function to verify the contract
async function verifyContract(contractAddress, constructorArgs) {
  try {
    console.log(`Verifying contract at address: ${contractAddress}`);

    // Run the verification task using Hardhat
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArgs,  // Provide constructor arguments
    });

    console.log(`Contract verified: ${contractAddress}`);
  } catch (error) {
    console.error(`Verification failed for ${contractAddress}:`, error);
  }
}

console.log(`Listening for events from contract at address: ${contractAddress}`);
