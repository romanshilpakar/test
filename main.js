const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "8d15d312839bfdd76d32da65a907f88e6c2b9800380f49a197c3376dad017400"
);
// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic("hex");

// Create new instance of Blockchain class
let holymolyCoin = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, "address2", 10);
tx1.signTransaction(myKey);
holymolyCoin.addTransaction(tx1);

//mine block

holymolyCoin.minePendingTransactions(myWalletAddress);

// Create second transaction & add it
const tx2 = new Transaction(myWalletAddress, "address1", 50);
tx2.signTransaction(myKey);
holymolyCoin.addTransaction(tx2);

//mine block

holymolyCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\nBalance of miner1 is",
  holymolyCoin.getBalanceOfAddress(myWalletAddress)
);
