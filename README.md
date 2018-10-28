# HW1

## (20%) 1. Please compare hash function and cryptographic hash function and give an example.

Answer:

### hash function 主要有幾種特性: 

1. 不可逆性： 無法從雜湊值推回原本的資料是什麼
2. 兩個不同原始值經由 hash 運算後所得的 hash value 要不一樣，但當兩個不同的原始值運算出相同的 hash value 值，即發生 hash collision，有多個解決方式，像是chaining 或是 open addressing

### Cryptographic hash function 與 Hash table 等都是 hash 的運用方式之一

* hash table  
	假設一 hash function 為 a-z 對應 1-26，而一串字母先轉換成其對應的數字再相加後即為所得的 hash value  
	則我們可以為常見的單字建立hash table，像是:
	* cat: 3+1+20 = 24
	* dog: 4+15+7 = 26
	
	之後就可將文章裡頭 cat和dog 用 24和26 來取代用來加速在文章搜尋這兩字的速度


* Cryptographic hash function  
	加密雜湊函式，是雜湊函式的一種。有以下幾個特性:
	1. 對於任何一個給定的訊息，它都很容易就能運算出雜湊數值
	2. 難以由一個已知的雜湊數值，去推算出原始的訊息。
	3. 在不更動雜湊數值的前提下，修改訊息內容是不可行的。
	4. 對於兩個不同的訊息，它不能給與相同的雜湊數值。

	以 MD5 為例．拿 cat 和 dog 分別做 md5 加密，可得到結果:
	
	* cat: d077f244def8a70e5ea758bd8352fcd8
	* dog: 06d80eb0c50b49a509b49f2424e8c805
	
	所以之後當使用者拿 cat 和 dog 當密碼時，可以快速的驗證其密碼是否一致

hash function 有很多種用途，以上述的 hash table 例子就是用來加速搜尋，而以 cryptographic hash function 例子就是用來加密確保其一致性



## (80%) 2. Peter is a noob in cryptocurrency and would like to get some Ethers...

### (30%) a. Can you print the private/public key with hex string representation? Please give us an example.

Answer: 

Result:

```shell
privKey: 97b54511506d616e89cf873bcbf13fc7032942a3757e1cf6cdc49d772007920b
pubKey: f8fb6b366cae2e7634a8fc23d7470c72f4ea3d097620dce552ef9c9524291b33fd4f4bc9ddea9300ce05acf0c3500d8c4a98784ecc349d53ec71f052a7297d9e
address: 0xde7a40a1f05d7b90bfc69de6bdb5c23b96b3fdbf
```

Source Code:

```js
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
```

### (20%) b. In addition, if we don’t want to use the getAddressString() to get the address, how can we obtain the address by hashing the public key?

Answer:
```js
/***** address *****/

// step 2:  public_key_hash = Keccak-256(public_key)

let public_key_hash = keccak256(pubKey)

// step 3:  address = ‘0x’ + last 20 bytes of public_key_hash

let address = '0x'+ public_key_hash.substr(public_key_hash.length - 40);
console.log("address:", address);

// Reasons:
// 20 bytes of string = 160 bits of string 
// hex string is 4 bit per unit,and keccak256(pubKey) will return hex string
// so we will get the last 160/4 = 40 unit of the hex string
```

### (30%) c. There is a file called Keystore that is used to encrypt the private key and save in a JSON file. Can you generate a Keystore with the password “nccu”? You can find the details about Keystore below.

Answer:

```shell
$ geth account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {b1d463feacb8f1ee509116a6aebf2bf3aa401bde}
```

```shell
$ geth account list
Account #0: {b1d463feacb8f1ee509116a6aebf2bf3aa401bde} keystore:/LocationToKeystore/UTC--2018-10-28T14-22-31.554716668Z--b1d463feacb8f1ee509116a6aebf2bf3aa401bde
```

```shell
$ cd /LocationToKeystore
```

```shell
$ cat UTC--2018-10-28T14-22-31.554716668Z--b1d463feacb8f1ee509116a6aebf2bf3aa401bde
```

Result in json format

```json
{
  "address": "b1d463feacb8f1ee509116a6aebf2bf3aa401bde",
  "crypto": {
    "cipher": "aes-128-ctr",
    "ciphertext": "c6b36ca2ea7fe1d796d98f97bc27bdea5f8163e165504761b02952c7a64b1ddb",
    "cipherparams": {
      "iv": "f8ca80c08939f144640b5d7d7ac93081"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "e15a168624ef093efd3ec6567308f317170886803cb7a72130610c19ca49458d"
    },
    "mac": "17e02bdb0120960cedfc315943faf3832c2b7f55073ddc60394b94ae7b2d8d1a"
  },
  "id": "c3750b90-6f90-4a34-9cc9-fdb890f9ecc4",
  "version": 3
}
```