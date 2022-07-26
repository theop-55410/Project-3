let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
const treasury = "0x9DaC9f4B5323cB723464Cb52ADc7E7855BeB6294"


export async function playerWon() {
    signer = await provider.getSigner();
    const rungameEscrowAddress = "0x745509E7ffEC3C64cEF423785CcaD3DF11e1275E";
    const rungameEscrowAbi = [
        "function playerWon(address _player) external returns (bool)", //might not need returns (bool)
    ];
    const runEscrowContract = new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    //let convertToWei = 1000000000
    //let amountToClaim = window.totalGweiScore * convertToWei
    await runEscrowContract.connect(signer).playerWon(signer.getAddress()) //needs to be a gameId variable but have 1 for test
}



export async function playerLost() {
    signer = await provider.getSigner();
    const rungameEscrowAddress = "0x745509E7ffEC3C64cEF423785CcaD3DF11e1275E";
    const rungameEscrowAbi = [
        "function playerLost(address _player) external returns (bool)", //might not need returns (bool)?
    ];
    const runEscrowContract = await new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    //let convertToWei = 1000000000
    //let amountToClaim = window.totalGweiScore * convertToWei
    await runEscrowContract.connect(signer).playerLost(signer.getAddress())
}