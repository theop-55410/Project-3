let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    console.log("Account address:", await signer.getAddress());

    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ether:", balance.toString() / convertToEth);
}

async function claimTokens() {
    const runTokenContractAddress = "0x00bcD49DcEaDbB4b9c7fF9E54a64CF2ad61ead61";
    const runTokenContractAbi = [
        "function mintTokens(address account, uint256 amount) public",
    ];
    const runTokenContract = new ethers.Contract(runTokenContractAddress, runTokenContractAbi, provider);
    let convertToWei = 1000000000
    let amountToClaim = window.totalGweiScore * convertToWei
    await runTokenContract.connect(signer).mintTokens(signer.getAddress(), amountToClaim.toString())
}

async function claimNft() {
    const nftContractAddress = "0x093298F529abdfCdA505e5C80A896478Dc32841a";
    const mintContractAbi = [
        "function mint(uint256 amount) public",
    ];
    const nftContract = new ethers.Contract(nftContractAddress, mintContractAbi, provider);
    await nftContract.connect(signer).mint(window.totalNFTScore.toString())
}

async function startGame() {
    //const rungameEscrowAddress = "0x360767822aCE73dceAdf51C2bb8256a4831A971d";
    //const rungameEscrowAbi = [
        "function startGame(uint256 _gameId, address _treasury, uint256 _amount) external returns (uint256)", //might not need returns (bool)
    //];
    //const rungameEscrowAddress = new ethers.Contract(rungameEscrowAddress, rungameEscrowAbi, provider);
    await rungameEscrowAddress.connect(signer).startGame(10, treasury, 1000000000000000000) //need a gameId function created to store the game instance in js, 1 is in there for test. Also need a function for player to enter amount they want to spend.
}
