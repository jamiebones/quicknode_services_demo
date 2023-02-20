const ethers = require("ethers");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {contractAddress, walletAddress } = req.body;
    console.log("the value is ", contractAddress, walletAddress)
    const responseData = await retrieveTransactionDataQuickNodeAPI(contractAddress, walletAddress);
    return res.status(200).json({ success: true, data: responseData });
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function retrieveTransactionDataQuickNodeAPI(contractAddress, walletAddress) {
  const connectionInfo = {
    url: "https://silent-red-layer.discover.quiknode.pro/d5f02bd6874d9e821a8e59d4071ec7f5cf3c1ac6/",
  };
  let provider = new ethers.providers.JsonRpcProvider(connectionInfo);
  const response = await provider.send("qn_getWalletTokenTransactions", {
    address: walletAddress,
    contract: contractAddress,
    page: 1,
    perPage: 10,
  });
   console.log("response data : ", response);
   return response;
}

