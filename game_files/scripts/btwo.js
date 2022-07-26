let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
const treasury = "0x9DaC9f4B5323cB723464Cb52ADc7E7855BeB6294"

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
    const rungameEscrowAddress = "0x745509E7ffEC3C64cEF423785CcaD3DF11e1275E";
    const rungameEscrowAbi = [
        "function startGame(address _treasury, uint256 _amount) external returns (uint256)", //might not need returns (bool)
    ];
    const runEscrowContract = new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    await runEscrowContract.connect(signer).startGame(treasury, "1000000000000000000") //need a gameId function created to store the game instance in js, 1 is in there for test. Also need a function for player to enter amount they want to spend.
    //gameId = gameId++

}
