const { startMining, stopMining, sendTransaction, } = require('./mine');
const { sign } = require('./sign');
const { verify } = require('./verify');
//const { generate } = require("./generate");
const { PORT } = require('./config');
const { utxos, blockchain } = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const req = require('express/lib/request');
const { send } = require('express/lib/response');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  const { method, params } = req.body;
  if (method === 'startMining') {
    startMining();
    res.send({ blockNumber: blockchain.blockHeight() });
    return;
  }
  if (method === 'stopMining') {
    stopMining();
    res.send({ blockNumber: blockchain.blockHeight() });
    return;
  }
  if (method === 'sendTransaction') {
    const  {senderPubkey, privateKey, message, recipient} = req.body;
    console.log(senderPubkey, privateKey, message, recipient)
    //sign(privateKey, message);
    //verify([sign(privateKey, message)]);
    sendTransaction(message);
    res.send({ blockNumber: blockchain.blockHeight() });
    return;
  }
  if (method === "getBalance") {
    const [address] = params;
    const ourUTXOs = utxos.filter(x => {
      return x.owner === address && !x.spent;
    });
    const sum = ourUTXOs.reduce((p, c) => p + c.amount, 0);
    res.send({ balance: sum.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
