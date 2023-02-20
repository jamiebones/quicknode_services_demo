import abiJSON from "./abi.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const contractABI = abiJSON;
  let contract;
  try {
    
    //checking for eth object in the window
    const connectionInfo = {
      url: "https://silent-red-layer.discover.quiknode.pro/d5f02bd6874d9e821a8e59d4071ec7f5cf3c1ac6/",
      headers: { referer: "eruditescholars.net" },
    };
    const provider = new ethers.providers.JsonRpcProvider(connectionInfo);
    contract = new ethers.Contract(contractAddress, contractABI, provider); // instantiating new connection to the contract
  } catch (error) {
    console.log("ERROR:", error);
  }
  return contract;
}

export default connectContract;
