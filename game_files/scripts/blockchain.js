let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;


//Insert escrow wallet address, escrow contract address, and token address
const treasury = "0x9DaC9f4B5323cB723464Cb52ADc7E7855BeB6294";
const rungameEscrowAddress = "0x9BdcD676B18218e6Acf9A789008E2EC288192332";
const tokenAddress = "0x734dAE634902BD7251Cc129f274aC0248DC7B5E6";

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