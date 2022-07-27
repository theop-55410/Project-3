let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

const rungameEscrowAddress = "00xf8122e9Bfc18fB711e09afAbDaD4ee19f0f812FB";


export async function playerWon() {
    signer = await provider.getSigner();
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
    const rungameEscrowAbi = [
        "function playerLost(address _player) external returns (bool)",
    ];
    const runEscrowContract = await new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    //let convertToWei = 1000000000
    //let amountToClaim = window.totalGweiScore * convertToWei
    await runEscrowContract.connect(signer).playerLost(signer.getAddress())
}