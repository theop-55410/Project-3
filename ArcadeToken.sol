/*
Arcade Token

Instructions:

1. Open Remix, and create a new file called `ArcadeToken.sol`.

2. Set the pragma to any version from 0.5.0 to 0.5.17.

3. Define a contract and name it `ArcadeToken`, or choose another name that’s appropriate for your business.

4. After you define and name your contract, add the following variables:

   * An `address payable` called `owner`. Set this to `msg.sender`. This will set you as the contract owner when the contract is deployed.

   * A `string` called `symbol`. Assign this variable the string “ARCD” or another appropriate ticker symbol, and make sure that it is set to `public`. This will allow other blockchain participants to recognize your token’s ticker symbol.

   * Set an `exchange_rate` variable equal to the number of tokens that you want to distribute per wei. Make sure that the variable is a `uint public` type.

   * Create a new mapping that associates `address` to `uint`. Name this variable `balances`.

5. Now, add a new function named `balance` that is a `public view` and that `returns(uint)`.

   * This function should return the balance of `msg.sender` by accessing the `balances` mapping and using `msg.sender` as the key.

6. Add a new function called `transfer` that accepts the `address recipient` and `uint value` as parameters. Within this function, complete the following steps:

   * Subtract the `value` from the balance of `msg.sender` in the `balances` mapping.

   * Then, add the `value` to the `recipient` balance in the mapping.

6. Now, add a way for customers to purchase new tokens! To do so, add a `public payable` function called `purchase`. It does not need any parameters. Within the function, complete the following steps:

   * Calculate a new `uint` called `amount` by multiplying `msg.value` by the `exchange_rate`. This will calculate the number of tokens to distribute.

   * Next, add the `amount` to the balance of `msg.sender`.

   * At the end of the function, transfer the `msg.value` to the `owner` address.

7. Finally, add a way for you, the business owner, to create new tokens when you need to. To do so, add a new function called `mint` to the contract by completing the following steps:

   * Use the same parameters that you did for the `transfer` function which you defined earlier.

   * At the beginning of the function, require that the `msg.sender` is equal to `owner`. Make sure to include an error message in the `require` statement.

   * Then, add the `value` (the number of tokens minted) to the recipient’s address balance in the mapping.

8. Test out your contract by deploying it and calling the functions that Remix exposes. Try minting some tokens for yourself, then sending them to another address!

*/

// Construct your ArcadeToken contract below:
