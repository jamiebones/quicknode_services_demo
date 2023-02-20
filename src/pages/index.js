import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import connectContract from "../utils/connectContract";
import { useEffect, useState } from "react";

export default function Home() {
  const [totalSupply, setTotalSupply] = useState("0");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [contractMetaData, setContractMetaData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenContract, setTokenContract] = useState("");

  async function getTokenInformation() {
    const contract = connectContract();
    if (contract) {
      setLoading(true);
      const tokenName = await contract.name();
      const totalSupply = await contract.totalSupply();
      const tokenSymbol = await contract.symbol();
      setName(tokenName);
      setTotalSupply(totalSupply.toString() / 10 ** 6);
      setSymbol(tokenSymbol);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTokenInformation();
  }, []);

  const callMetaDataApi = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-meta-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-qn-api-version": 1,
          referrer: "localhost:3000",
        },
        body: JSON.stringify(contractAddress),
      });
      if (response.status !== 200) {
        alert("Oops! Something went wrong. Please refresh and try again.");
        setLoading(false);
      } else {
        let responseJSON = await response.json();
        const { contract } = responseJSON.data;
        const metaData = {
          ...contract,
        };
        setLoading(false);
        setContractMetaData(metaData);
        console.log("json response ", responseJSON);
      }
      // check response, if success is false, dont take them to success page
    } catch (error) {
      setLoading(false);
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  };

  const callTransactionDataApi = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-transaction-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-qn-api-version": 1,
          referrer: "localhost:3000",
        },
        body: JSON.stringify({
          contractAddress: tokenContract,
          walletAddress: walletAddress,
        }),
      });
      if (response.status !== 200) {
        alert("Oops! Something went wrong. Please refresh and try again.");
        setLoading(false);
      } else {
        let responseJSON = await response.json();
        const { contract } = responseJSON.data;
        const metaData = {
          ...contract,
        };
        setLoading(false);
        setContractMetaData(metaData);
        console.log("json response ", responseJSON);
      }
      // check response, if success is false, dont take them to success page
    } catch (error) {
      setLoading(false);
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  };

  return (
    <>
      <Head>
        <title>Using QuickNode Services</title>
        <meta name="description" content="Tips on using QuickNode Services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <ul>
          <li>
            <ConnectButton />
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <h2>Token Information</h2>
        <div className={styles.center}>
          <div className={styles.card}>
            {loading ? (
              <p>Loading token data..............</p>
            ) : (
              <div>
                <p>Token Name : {name}</p>
                <br />
                <p>Total Supply: {totalSupply}</p>
                <br />
                <p>Token Symbol: {symbol}</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.center}>
     
            <input
              type="text"
              onChange={(e) => setContractAddress(e.target.value)}
              className={styles.input}
              value={contractAddress}
            />

            <button
              onClick={callMetaDataApi}
              className={styles.button}
              disabled={loading}
            >
              Retrieve Token Metadata
            </button>
          
        </div>
        {loading && <p>Getting data...............</p>}
        <div className={styles.center}>
          {contractMetaData && (
            <div className={styles.card}>
              <p>Token Name : {contractMetaData.name}</p>
              <p>Token Symbol : {contractMetaData.symbol}</p>
              <p>Token Decimal : {contractMetaData.decimals}</p>
              <p>Genesis Block : {contractMetaData.genesisBlock}</p>
              <p>
                Genesis Transactions : {contractMetaData.genesisTransaction}
              </p>
            </div>
          )}
        </div>

        <div className={styles.center}>
          <input
            type="text"
            placeholder="Token contract address"
            onChange={(e) => setTokenContract(e.target.value)}
            className={styles.input}
            value={tokenContract}
          />

          <input
            type="text"
            placeholder="Wallet address"
            onChange={(e) => setWalletAddress(e.target.value)}
            className={styles.input}
            value={walletAddress}
          />

          <button onClick={callTransactionDataApi} className={styles.button}>
            Retrieve Transaction Data
          </button>
        </div>
      </main>
    </>
  );
}
