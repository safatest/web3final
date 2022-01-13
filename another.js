/* Moralis init code */
const serverUrl = "https://hphsz23x9pt3.usemoralis.com:2053/server";
const appId = "msB9G7dAHJ05kSEm0rCbQxkIYG9T20E3kXJsbI8a";

Moralis.start({ serverUrl, appId });

/* Authentication code */
async function logOut() {
  await Moralis.User.logOut();
  alert("logged out");
  window.location.href = "index.html";
}

async function getTransactionsUser() {
  let userAddr = "";
  let options = {};
  if (userAddr == "")
    userAddr = Moralis.User.current().attributes.accounts[0];
  try{
    options = { address: userAddr, limit: 10 };
    const userTransactions = await Moralis.Web3API.account.getTransactions(options);
    document.getElementById("out").innerHTML = JSON.stringify({user: userAddr, results: userTransactions.result}, null, 2);
  } catch (err){
    document.getElementById("out").innerHTML = JSON.stringify(err, null, 2);
  }
}

document.getElementById("btn-get-transaction-details").onclick = getTransactionsUser
document.getElementById("btn-logout").onclick = logOut;