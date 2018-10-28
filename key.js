// question 2-1

const Wallet = require('ethereumjs-wallet');
const keccak256 = require('js-sha3').keccak256;

// keypair
const wallet = Wallet.generate();
 
// privKey
const privKey = wallet.getPrivateKey();
console.log("privKey:", privKey.toString('hex'));
 
// pubKey
const pubKey = wallet.getPublicKey();
console.log("pubKey:", pubKey.toString('hex'));

// address
let address = wallet.getAddressString();
console.log("address:", address);



/***** address *****/

// step 2:  public_key_hash = Keccak-256(public_key)
let public_key_hash = keccak256(pubKey)

// step 3:  address = ‘0x’ + last 20 bytes of public_key_hash

// 20 bytes of string = 160 bits of string 
// hex string is 4 bit per unit,and keccak256(pubKey) will return hex string
// so we will get the last 160/4 = 40 unit of the hex string
let address2 = '0x'+ public_key_hash.substr(public_key_hash.length - 40);
console.log("address2:", address2);


const arrayBufferPub = keccak256.arrayBuffer(pubKey)
const bufferCopied =  arrayBufferPub.slice(-20)
function toBuffer(ab) {
  var buf = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
  }
  return buf;
}
let address3 = '0x'+ toBuffer(bufferCopied).toString('hex');
console.log("address3:", address3);


var bytes = keccak256.array(pubKey)
let address4 = '0x'+ bytes.slice(-20).map(ele=>ele.toString(16)).reduce((a,b)=>a+b)
console.log("address4:", address4);



// console.log("address:", address);


// buffer.slice(-4)

// function getBytes(string){
//   return Buffer.byteLength(string, 'utf8')
// }






// a60b88eaaaefcd0975330a424f98c4431f05cff5