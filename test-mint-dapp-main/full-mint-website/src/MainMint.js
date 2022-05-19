import { useState } from "react";
import { ethers, BigNumber} from 'ethers';
import kjNFT from './KJNFT.json';

const kjNFTAddress = process.env.REACT_APP_ADDRESS;

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                kjNFTAddress,
                kjNFT.abi,
                signer
            )

            try{
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                })
                console.log("Response : ", response)
            } catch (err) {
                console.log("Error : ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount-1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount+1);
    };

    return (
        <div>
            <h1 >KJ NFTs</h1>
            <p>Welcome to KJ NFTs. A working demo for Login with Unstoppable Domains</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount}/>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                </div>
            ) : (
                <p>You must be connected to mint</p>
            )}
        </div>
    )

}

export default MainMint;
 