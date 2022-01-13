/* Moralis init code */
const serverUrl = "https://hphsz23x9pt3.usemoralis.com:2053/server";
const appId = "msB9G7dAHJ05kSEm0rCbQxkIYG9T20E3kXJsbI8a";

Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if(user) {
    window.location.href = "anotherpage.html";
  }
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        window.location.href = "anotherpage.html";
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

async function sendValue() {
  let userAddr = document.getElementById("user-id").value;
  localStorage.setItem("addr", userAddr);
  window.location.href="displaynfts.html";
}

document.getElementById("btn-get-nft-details").onclick = sendValue
document.getElementById("btn-login").onclick = login;