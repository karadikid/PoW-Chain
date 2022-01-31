const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1');

// TODO: fill in the public key points
//const publicKey = {"",}

//const key = ec.keyFromPublic(publicKey, 'hex');

// TODO: change this message to whatever was signed
//const msg = "I am in the ChainShot Bootcamp";
//const msgHash = SHA256(msg).toString();

// TODO: fill in the signature components
//const signature = {  r: "",s: "" };


async function verify(msgHash, signature, senderPubkey){
  const key = ec.keyFromPublic(senderPubkey, 'hex');
  const verifySignature = key.verify(msgHash, signature);
  console.log(key.verify(msgHash, signature));
  return verifySignature;
}


module.exports = {
  verify,
}

