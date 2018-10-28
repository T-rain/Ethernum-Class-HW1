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


// question 2-2
/***** address *****/

// step 2:  public_key_hash = Keccak-256(public_key)
// step 3:  address = ‘0x’ + last 20 bytes of public_key_hash

// First method
let public_key_hash = keccak256(pubKey)
let address2 = '0x'+ public_key_hash.substr(public_key_hash.length - 40);
console.log("address2:", address2);

// Reason:
// 20 bytes of string = 160 bits of string 
// hex string is 4 bit per unit,and keccak256(pubKey) will return hex string
// so we will get the last 160/4 = 40 unit of the hex string

// Second method
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

//Third method
var bytes = keccak256.array(pubKey)
let address4 = '0x'+ bytes.slice(-20).map(ele=>ele.toString(16)).reduce((a,b)=>a+b)
console.log("address4:", address4);



// question 2-3
geth account new
geth account list
cd /LocationToKeystore
cat Keystore-File-Name


