const serverUrl = "https://hphsz23x9pt3.usemoralis.com:2053/server";
const appId = "msB9G7dAHJ05kSEm0rCbQxkIYG9T20E3kXJsbI8a";

// const url = 'https://api.opensea.io/api/v1/asset/0x495f947276749ce646f68ac8c248420045cb7b5e/13920260661940946805075895673459080738859946120609398873476202579976676966401/';
// let response = fetch(url, {method: 'GET'})
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));


class NFT {
  constructor() {
    this.name;
    this.description;
    // this.external_url;
    // this.symbol;
    this.token_address
    this.token_id;
    // this.id;
    // this.owner_of;
    // this.author;
    this.dop
    this.attributes;
    // this.image;
    this.image;
  }
}
Moralis.start({ serverUrl, appId });
async function goBack() {
    //console.log(e)
    //alert("wait")
    window.location.href="index.html";
}

async function gotoDetails(e) {
  //console.log(e)
  //alert("wait")
  localStorage.setItem("token-addr", e);
  window.location.href="view-details.html";
}

async function getData(url) {
  try{
  const response = await fetch(url)
  const data = await response.json()
  return data;
  }
  catch(err){
    console.err(err.message)
    return null
  }
}
async function getNFTDetailsUser() {
    var b = localStorage.getItem("addr");
    let userAddr = b;
    let options = {};
    if (userAddr == "")
      userAddr = Moralis.User.current().attributes.accounts[0];
    let items = [];
    let items2 = []
    try{
      options = { address: userAddr };
      const userEthNFTs = await Moralis.Web3API.account.getNFTs(options);
      let i = 0;
      for(item in userEthNFTs.result)
      {
        //console.log(userEthNFTs.result[item].token_address)
        // const opt = { address: userEthNFTs.result[item].token_address, chain: "eth", limit: "1" };
        // let nftTransfers
        // try{
        //   nftTransfers = await Moralis.Web3API.token.getContractNFTTransfers(opt);
        // }
        // catch(er)
        // {
        //   console.er(er.message)
        // }
        //console.log(nftTransfers.result)
          //console.log("for:", userAddr)
          //let url = userEthNFTs.result[i].token_uri
          //console.log("url:", url);
          let data
          let data2
          try {
            data = JSON.parse(userEthNFTs.result[i].metadata)
            data2 = userEthNFTs.result[i]
            //console.log(data)
            //console.log(await Moralis.Web3API.token.getNFTMetadata({address: userEthNFTs.result[i].token_address}))
            //console.log(await getData(userEthNFTs.result[i].token_uri))
            try{
            if(!data)
            {
              if(userEthNFTs.result[i].token_uri)
              data = await getData(userEthNFTs.result[i].token_uri);
            }
          }
            catch(err) {}
            // }
            //data = await getData(userEthNFTs.result[i].token_uri);
            //console.log(userEthNFTs.result[i].token_address)
            //data = await Moralis.Web3API.token.getNFTMetadata({address: userEthNFTs.result[i].token_address});
          }
          catch(err) {
            //data = JSON.parse(userEthNFTs.result[i].metadata)
            // if(!data)
            // {
            //   data = await getData(userEthNFTs.result[i].token_uri);
            //   //data = await getData(userEthNFTs.result[i].metadata);
            // }

            console.err(err.message)
          }
          // BLOCK_TIMESTAMP
          // if(data)
          // {
          //   const opt = { address: userEthNFTs.result[item].token_address, chain: "eth", limit: "3" };
          //   let nftTransfers
          //   try{
          //     nftTransfers = await Moralis.Web3API.token.getContractNFTTransfers(opt);
          //   }
          //   catch(er)
          //   {
          //    console.er(er.message)
          //   }
          //   console.log(nftTransfers.result)
          //   //console.log(nftTransfers.result[0].block_timestamp)
          //   //console.log(userEthNFTs.result[i].token_address)
          // }
          //console.log("data:", data)
          items.push(data);
          items2.push(data2)
          i++;
      }
      let array = []
      for(item in items)
      {
        if(items[item])
        {
        let temp = new NFT();
        temp.name = items[item].name
        temp.token_address = items2[item].token_address
        temp.token_id = items2[item].token_id
        temp.description = items[item].description
        temp.image = items[item].image
        if(items[item].traits)
        {
           temp.attributes = items[item].traits
        }
        if(items[item].attributes)
        {
           temp.attributes = items[item].attributes
        }
        //console.log(temp.image)
        if(temp.image.startsWith('ipfs://ipfs'))
        {
          temp.image = temp.image.substring(11)
          temp.image = 'https://ipfs.io/ipfs/'+temp.image
        }
        if(temp.image.startsWith('ipfs://'))
        {
          temp.image = temp.image.substring(7)
          temp.image = 'https://ipfs.io/ipfs/'+temp.image
        }
        array.push(temp)
        }
      }
      //console.log(array[0].image)
      //console.log(array)
      // for(i =1; i<= 2; i++){
      //   $('#out').append('<div > <img src="'+ array[i].image +'"</img> </div>')
      // }
      //console.log(array)
      const container = document.getElementById('out');
      for(i =0; i< array.length; i++) {
  // Create card element
  const card = document.createElement('div');
  console.log([array[i].token_address, array[i].token_id])
  // Construct card content
  const addr = String(array[i].token_address)
  var content = `
    <div class="solid">
    <h2>${array[i].name}</h2>
    <br>
    <img src="${array[i].image}"
    width="auto" 
    height="200"
    margin-bottom: 100px;
    margin-right: 150px;
    style = "float: left"/>
    <i>${array[i].description}</i>
    <br>
    <br> 
    <button id="more details`+i+`" onclick = "gotoDetails(\``+[array[i].token_address, array[i].token_id]+`\`);">details</button>
    <br>
    <p style="clear:both";> </p>
    `;//MAKE A FUNCTION FOR THE BUTTON
    //console.log(typeof array[i].attributes)
    if(array[i].attributes)
    {
      content+=`<b>attributes:</b>`
      if(array[i].attributes[0].trait_type)
      {
      for(var j = 0; j<array[i].attributes.length; j++)
      {
        content+= `<p>${array[i].attributes[j].trait_type}: ${array[i].attributes[j].value}</p>`
      }
    }
    else{
      for(var j = 0; j<array[i].attributes.length; j++)
    {
      content+= `<p>${array[i].attributes[j]}</p>`
    }
    }
      
  }
  // Append newyly created card element to the container
  container.innerHTML += content+`</div> <br>`;
  //console.log("details"+i)
  document.getElementById("details"+i).onclick = goBack;
}
      
      //console.log(container)
      //document.getElementById("out").innerHTML = JSON.stringify({user: userAddr, results: items}, null, 2);
      //console.log(items)
      //console.log(array)
      //console.log(userEthNFTs.result)
      //document.getElementById("out").innerHTML = JSON.stringify({user: userAddr, results: userEthNFTs.result}, null, 2);
      //document.getElementById("out").innerHTML = card
    } catch (err){
      document.getElementById("out").innerHTML = JSON.stringify(err, null, 2);
    }
  }
  
getNFTDetailsUser()
document.getElementById("btn-back").onclick = goBack;
