let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
const treasury = "0x9DaC9f4B5323cB723464Cb52ADc7E7855BeB6294"
const gameId = 10


export async function playerWon() {
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



export async function playerLost() {
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