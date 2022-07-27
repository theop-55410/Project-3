let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;


//Insert escrow wallet address, escrow contract address, and token address
const treasury = "0xD82bdAd2D17cAb4913e53dde841dc2b3B6DaD2c1";
const rungameEscrowAddress = "00xf8122e9Bfc18fB711e09afAbDaD4ee19f0f812FB";
const tokenAddress = "0xe3fb96A18Ba98876224f964CaD325A87252d67b1";

async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    console.log("Account address:", await signer.getAddress());
    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ether:", balance.toString() / convertToEth);
}
//onload
async function startGame() {
    signer = await provider.getSigner();
    const rungameEscrowAbi = [
        "function startGame(address _treasury, uint256 _amount) external returns (uint256)",
    ];
    const runEscrowContract = new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    await runEscrowContract.connect(signer).startGame(treasury, "1000000000000000000")
    //gameId = gameId++

}


async function approveToken() {
    signer = await provider.getSigner();
    
    const runApproveAbi = [
        "function approve(address spender, uint256 amount)"
    ];
    const runTokenContract = new ethers.Contract(tokenAddress, runApproveAbi, provider);
    await runTokenContract.connect(signer).approve(rungameEscrowAddress, "0")
}