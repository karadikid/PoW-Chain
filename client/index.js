import "./index.scss";
import "../config";
import { PRIVATE_KEY, PUBLIC_KEY } from "../config";

const server = "http://localhost:3032";

//`${server}`

function getBalance() {
  const address = "049a1bad614bcd85b5f5c36703ebe94adbfef7af163b39a9dd3ddbc4f286820031dfcb3cd9b3d2fcbaec56ff95b0178b75d042968462fbfe3d604e02357125ded5";

  const params = {
    method: "getBalance",
    params: [address],
    jsonrpc: "2.0",
    id: 1
  }

  const request = new Request(`${server}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(response => {
      document.getElementById("balance").innerHTML = response.balance;
    });
}

setInterval(getBalance, 1000);


document.getElementById("start-mining").addEventListener('click', () => {
  const request = new Request(`${server}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'startMining' })
  });

  fetch(request)
    .then(response => {
      return response.json();
    }).then(({ blockNumber }) => {
      alert(`Started @ block ${blockNumber}`);
    });
});

document.getElementById("stop-mining").addEventListener('click', () => {
  const request = new Request(`${server}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method: 'stopMining' })
  });


  fetch(request)
    .then(response => {
      return response.json();
    }).then(({ blockNumber }) => {
      alert(`Stopped @ block ${blockNumber}`);
    });


});
document.getElementById("transfer-amount").addEventListener('click', () => {
  const senderPubkey = document.getElementById("exchange-address").value.defaultValue = PUBLIC_KEY;
  const sender = document.getElementById("private-key").value.defaultValue = PRIVATE_KEY;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;

  const request = new Request(`${server}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      senderPubkey,
      sender,
      amount,
      recipient,
      method: 'sendTransaction'
    })
  });   
  fetch(request)
    .then(response => {
      return response.json();
    }).then(({ blockNumber }) => {
      alert(`Transaction Sent ${blockNumber}`);
    });
});
