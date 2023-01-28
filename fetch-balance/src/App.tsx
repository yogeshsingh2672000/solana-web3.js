import React, { useState } from 'react';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js"
import './App.css';

const NETWORK = clusterApiUrl("devnet");

function App() {
  const [address, setAddress] = useState<null | string>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [isExecutable, setIsExecutable] = useState<any>(false)

  const hangleUserInput = (e: any) => {
    const { value } = e.currentTarget
    setAddress(value)
  }
  const handleSubmit = async () => {
    try {
      const pubKey = new PublicKey(address ? address : "")
      const connection = new Connection(NETWORK)
      // fetching balance
      const balance = await connection.getBalance(pubKey)
      setBalance(balance / LAMPORTS_PER_SOL)
      // getting account info
      const exeStatus = await connection.getAccountInfo(pubKey)
      setIsExecutable(exeStatus && exeStatus.executable)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="App">
      <input value={address ? address : ""} onChange={hangleUserInput} type="text" />
      <button onClick={handleSubmit}>Click</button>
      <p>{address ? `Address: ${address}` : ""}</p>
      <p>{balance ? `Balance: ${balance}` : ""}</p>
      <p>is Executable: {isExecutable ? "true" : "false"}</p>
    </div>
  );
}

export default App;
