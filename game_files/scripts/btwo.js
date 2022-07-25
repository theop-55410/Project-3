let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
const treasury = "0x9DaC9f4B5323cB723464Cb52ADc7E7855BeB6294"
const gameId = 1

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
    const rungameEscrowAddress = "0x360767822aCE73dceAdf51C2bb8256a4831A971d";
    const rungameEscrowAbi = [
        "function startGame(uint256 _gameId, address _treasury, uint256 _amount) external returns (uint256)", //might not need returns (bool)
    ];
    const runEscrowContract = new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    await runEscrowContract.connect(signer).startGame(10, treasury, "1000000000000000000") //need a gameId function created to store the game instance in js, 1 is in there for test. Also need a function for player to enter amount they want to spend.
    //gameId = gameId++

}


async function playerWon() {
    signer = await provider.getSigner();
    const rungameEscrowAddress = "0x360767822aCE73dceAdf51C2bb8256a4831A971d";
    const rungameEscrowAbi = [
        "function playerWon(uint256 _gameId, address _player) external returns (bool)", //might not need returns (bool)
    ];
    const runEscrowContract = new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    //let convertToWei = 1000000000
    //let amountToClaim = window.totalGweiScore * convertToWei
    await runEscrowContract.connect(signer).playerWon(10, signer.getAddress()) //needs to be a gameId variable but have 1 for test
}



async function playerLost() {
    signer = await provider.getSigner();
    const rungameEscrowAddress = "0x360767822aCE73dceAdf51C2bb8256a4831A971d";
    const rungameEscrowAbi = [
        "function playerLost(uint256 _gameId, address _player) external returns (bool)", //might not need returns (bool)?
    ];
    const runEscrowContract = new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    //let convertToWei = 1000000000
    //let amountToClaim = window.totalGweiScore * convertToWei
    await runEscrowContract.connect(signer).playerLost(10, signer.getAddress())
}

