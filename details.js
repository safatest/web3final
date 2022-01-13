
var token = localStorage.getItem("token-addr");
const tokenarray = token.split(",")
//console.log(tokenarray)
//document.getElementById("out").innerHTML = tokenarray[1]
const url = 'https://api.opensea.io/api/v1/asset/'+tokenarray[0]+'/'+tokenarray[1]+'/';
let response = fetch(url, {method: 'GET'})
  .then(res => res.json())
  .then(json => {console.log(json)
    document.getElementById("name").innerHTML = json.name+"  "+`<img src="${json.image_thumbnail_url}", width="auto" height="24"></img>`
    document.getElementById("own").innerHTML = "Owned by "+json.owner.user.username+" "+json.owner.address
    document.getElementById("type").innerHTML = "CONTRACT TYPE: "+json.asset_contract.asset_contract_type
    document.getElementById("scheme").innerHTML = "TOKEN STANDARD: "+json.asset_contract.schema_name
    if(json.last_sale)
    document.getElementById("dop").innerHTML = "LAST SOLD: "+json.last_sale.created_date.substring(0,10)
    if(json.last_sale)
    document.getElementById("price").innerHTML = "PRICE PAID: "+parseFloat(json.last_sale.total_price)/1000000000000000000+" "+json.last_sale.payment_token.symbol})
  .catch(err => console.error('error:' + err));
