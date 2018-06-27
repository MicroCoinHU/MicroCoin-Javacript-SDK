/**
 * MicroCoin
 * # MicroCoin API  MicroCoin rider is an API server for the MicroCoin ecosystem.  It acts as the interface between MicroCoin network and applications that want to access the MicroCoin network.  It allows you to submit transactions to the network, check the status of accounts, subscribe to transactions, etc.  Rider provides a RESTful API to allow client applications to interact with the MicroCoin network.  You can communicate with Rider using cURL or just your web browser. However, if you’re building a client application, you’ll likely want to use a MicroCoin SDK in the language of your client\";    # PHP quickstart guide  ## Download the client SDK  First you need a MicroCoin client SDK. You can download it from [here](), or clone from our [Github](https://github.com) repository.  ```  git clone https://  ```  ## Keys and signatures  MicroCoin works with ECDSA signatures, so you need to work with ECDSA keys and signatures.  You can use your favorite **ECDSA** package, or use `simplito/elliptic-php`. We are using `simplito/elliptic-php` in our demos.    ## Generate new ECDSA keyPair  If you have no keys, you must generate a new key, then store it in a secure place.  **Please notice: if you lose your key, you lose your accounts and your coins**  ```php  use Elliptic\\EC;  $ec = new EC('secp256k1');  $myKey = $ec->genKeyPair();  ```  ## Import ECDSA private key  If you have a key, you can import it from a hexadecimal string.  ```php  use Elliptic\\EC;  $ec = new EC('secp256k1');  $myKey = $ec->keyFromPrivate(\"PRIVATE KEY IN HEX\");  ```  ## List your accounts  If you have accounts you can list there. First time you have no accounts, so you need get one.  Every account belongs to a public key. One public key can be used for multiple accounts.  ```php  $api = new \\MicroCoin\\Api\\AccountApi();  // You must convert the ECPoint to a MicroCoin SimpleKey  $key = new \\MicroCoin\\Model\\SimpleKey();  $key->setCurveType(\"secp256k1\");  $key->setX($myKey->getPublic()->getX()->toString(16));  $key->setY($myKey->getPublic()->getY()->toString(16));    print_r($api->myAccounts($key));  ```  ## List accounts for sale  You can purchase accounts, but you need to know which accounts are for sale.  ```php  $api = new \\MicroCoin\\Api\\AccountApi();  print_r($api->getOffers());  ```    ## Purchase account  You can purchase any account for sale, if you have enough coins.  ```php  $api = new \\MicroCoin\\Api\\AccountApi();    // First convert your public key  $key = new \\MicroCoin\\Model\\SimpleKey([      \"curve_type\" => \"secp256k1\",      \"x\" => $myKey->getPublic()->getX()->toString(16),      \"y\" => $myKey->getPublic()->getY()->toString(16)  ]);    $purchaseAccountRequest = new \\MicroCoin\\Model\\PurchaseAccountRequest();   // Account to purchase   $purchaseAccountRequest->setAccountNumber('0-10');  $purchaseAccountRequest->setFee(0);  // This account will pay the price and the fee  $purchaseAccountRequest->setFounderAccount('1-22');    // The new owner  $purchaseAccountRequest->setNewKey($key);   // preapare transaction  $transaction = $api->startPurchaseAccount($purchaseAccountRequest);   // Sign transaction  $sign = $myKey->sign($transaction->getHash());  // Fill signature  $transaction->setSignature(new \\MicroCoin\\Model\\Signature([\"r\"=>$sign->r->toString(16), \"s\"=>$sign->r->toString(16)]));  // Commit transaction  $result = $api->commitPurchaseAccount($transaction);  // You are done  print_r($result);    ```    ## Sending coins  If you have enough balance, you can send coins from your accounts to any valid account.  ```php  $api = new \\MicroCoin\\Api\\TransactionApi();  $sendCoinRequest = new \\MicroCoin\\Model\\TransactionRequest();  // Source account  $sendCoinRequest->setSender('0-10');  // Destination account  $sendCoinRequest->setTarget('1-22');  // Amount to send  $sendCoinRequest->setAmount(0.0001);  // Optinal fee  $sendCoinRequest->setFee(0);  // Optional payload  $sendCoinRequest->setPayload(\"Hello MicroCoin\");  // Prepare a new transaction  $transaction = $api->startTransaction($sendCoinRequest);  // Sign transaction with your private key (private key what belongs to the sender account)  $sign = $myKey->sign($transaction->getHash());  // Fill signature  $transaction->setSignature( new \\MicroCoin\\Model\\Signature([\"r\"=>$sign->r->toString(16), \"s\"=>$sign->r->toString(16)]) );  // Commit transaction  $result = $api->commitTransaction($transaction);  // Coins sent  print_r($result);  ```  ## Change account owner  If you want change your account owner, you can do it with change the assigned public key.  ```php  $changeKeyRequest->setAccountNumber('0-10');  // Key of the new owner  $changeKeyRequest->setNewOwnerPublicKey(new \\MicroCoin\\Model\\SimpleKey([      \"curve_type\" => \"secp256k1\",      \"x\" => $newKey->getPublic()->getX()->toString(16),      \"y\" => $newKey->getPublic()->getY()->toString(16)  ]));  $changeKeyRequest->setFee(0);  // Prepare transaction  $transaction = $api->startChangeKey($changeKeyRequest);  // Fill signature  $transaction->setSignature( new \\MicroCoin\\Model\\Signature([\"r\"=>$sign->r->toString(16), \"s\"=>$sign->r->toString(16)]) );  // Commit transaction  $result = $api->commitPurchaseAccount($transaction);  // You are done  print_r($result);  ```  ***    # Javascript quickstart guide    ## Download the client SDK  First you need a MicroCoin client SDK. You can download it from [here](), or clone from our [Github](https://github.com) repository.  ```  git clone https://  ```  ## Keys and signatures  MicroCoin works with ECDSA signatures, so you need to work with ECDSA keys and signatures.  You can use your favorite **ECDSA** package, or use `elliptic.js`. We are using `elliptic.js` in our demos.    ## Generate new ECDSA keyPair  If you have no keys, you must generate a new key, then store it in a secure place.  **Please notice: if you lose your key, you lose your accounts and your coins**  ```js  var ec = new elliptic.ec(\"secp256k1\");  var myKey = ec.genKeyPair();  ```  ## Import ECDSA private key  If you have a key, you can import it from a hexadecimal string.  ```js  var ec = new elliptic.ec(\"secp256k1\");  var myKey = ec.keyPair({ \"priv\":\"PRIVATE KEY IN HEX\", \"privEnc\":\"hex\" });  ```  ## Export ECDSA key  Sometimes you need save your key, or you need to display it. You can export your key using this method  ```js  var exportedKey = {     private: keyPair.getPrivate(\"hex\"),     public: {         X: keyPair.getPublic().x.toString(16),         Y: keyPair.getPublic().y.toString(16)      }  }  ```  ## List your accounts  If you have accounts you can list there. First time you have no accounts, so you need get one.  Every account belongs to a public key. One public key can be used for multiple accounts.  ```js  var accountApi = new MicroCoin.AccountApi();  // Never send your private key!  accountApi.myAccounts({      \"curveType\":\"secp256k1\",      \"x\": myKey.getPublic().getX(\"hex\"),      \"y\": myKey.getPublic().getY(\"hex\")  }).then(myAccounts => console.log(myAccounts));  ```    ## Get single account  You can request information from a single account. You can see the balance, name, etc..  ```js  var accountApi = new MicroCoin.AccountApi();  accountApi.getAccount(\"0-10\").then(account => console.log(account));  ```    ## List accounts for sale  You can purchase accounts, but you need to know which accounts are for sale.  ```js  var accountApi = new MicroCoin.AccountApi();  accountApi.getOffers().then(offers => console.log(offers));  ```  ## Purchase account  You can purchase any account for sale, if you have enough coins.  ```js  var purchaseRequest = new MicroCoin.PurchaseAccountRequest();  purchaseRequest.setAccountNumber(\"34689-25\"); // The account to purchase  purchaseRequest.setFounderAccount(\"1-22\");   // The founder account will pay for the account  purchaseRequest.setFee(0);  // Optional miner fee  // This is key of the new owner. You can use your own key, or any key what you want.  // After the purchase completed you can only manage this account with this keyPair  purchaseRequest.setNewKey({      \"CurveType\":\"secp256k1\",      \"X\": myKey.getPublic().getX(\"hex\"),      \"Y\": myKey.getPublic().getY(\"hex\")  });  // First prepare the transaction  accountApi.startPurchaseAccount(purchaseRequest).then(function (transaction) {      // Now we need to sign our transaction using the founder account private key      var signature = myKey.sign(transaction.getHash());      // Now fill the signature property      transaction.signature = { \"r\": signature.r, \"s\": signature.s };      // Last we need to commit our transaction and we are done      accountApi.commitPurchaseAccount(transaction).then((response)=>console.log(response), e => console.error(e));  });  ```    ## Sending coins  If you have enough balance, you can send coins from your accounts to any valid account.  ```js  var transactionApi = new MicroCoin.TransactionApi();  var sendCoinRequest = new MicroCoin.TransactionRequest();  sendCoinRequest.setSender('0-10'); // Source account  sendCoinRequest.setTarget('1-22'); // Target account  sendCoinRequest.setAmount(0.0001); // Amount to send  sendCoinRequest.setFee(0); // optional miner fee, one transaction / block (5 min) is free  sendCoinRequest.setPayload(\"Hello MicroCoin\"); // optional payload  // First we are creating a transaction  transactionApi.startTransaction(sendCoinRequest).then(function (transaction) {      // When the transaction created, we need to sign the transaction      var signature = myKey.sign(transaction.getHash());      // Now fill the signature property      transaction.signature = { \"r\": signature.r, \"s\": signature.s };      // Last we need to commit our transaction and we are done      transactionApi.commitTransaction(transaction).then((response)=>console.log(response), e => console.error(e));  });  ```    ## Change account owner  If you want change your account owner, you can do it with change the assigned public key.  ```js  var request = new MicroCoin.ChangeKeyRequest();  request.setAccountNumber(\"0-10\"); // The account to change  // newKey: Public key of the new owner  request.setNewOwnerPublicKey({      \"curveType\":\"secp256k1\",      \"x\": newKey.getPublic().getX(\"hex\"),      \"y\": newKey.getPublic().getY(\"hex\")  });  // First we are creating a transaction  accountApi.startChangeKey(request).then(function (transaction) {      // When the transaction created, we need to sign the transaction      // myKey: key of the current owner       var signature = myKey.sign(transaction.getHash());      transaction.signature = { \"r\": signature.r, \"s\": signature.s };      // Last we need to commit our transaction and we are done, the new owner can use his/her account      accountApi.commitChangeKey(transaction).then((response)=>console.log(response), e => console.error(e));  });  ```  
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: unset
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Signature', 'model/SimpleKey'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Signature'), require('./SimpleKey'));
  } else {
    // Browser globals (root is window)
    if (!root.MicroCoin) {
      root.MicroCoin = {};
    }
    root.MicroCoin.PurchaseAccountRequest = factory(root.MicroCoin.ApiClient, root.MicroCoin.Signature, root.MicroCoin.SimpleKey);
  }
}(this, function(ApiClient, Signature, SimpleKey) {
  'use strict';




  /**
   * The PurchaseAccountRequest model module.
   * @module model/PurchaseAccountRequest
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>PurchaseAccountRequest</code>.
   * Purchase account request
   * @alias module:model/PurchaseAccountRequest
   * @class
   * @param accountNumber {String} Account to purchase
   * @param founderAccount {String} Founder account, who will pay the price
   * @param fee {Number} Transaction fee, if any, otherwise zero
   */
  var exports = function(accountNumber, founderAccount, fee) {
    var _this = this;

    _this['accountNumber'] = accountNumber;
    _this['founderAccount'] = founderAccount;



    _this['fee'] = fee;
  };

  /**
   * Constructs a <code>PurchaseAccountRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PurchaseAccountRequest} obj Optional instance to populate.
   * @return {module:model/PurchaseAccountRequest} The populated <code>PurchaseAccountRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('accountNumber')) {
        obj['accountNumber'] = ApiClient.convertToType(data['accountNumber'], 'String');
      }
      if (data.hasOwnProperty('founderAccount')) {
        obj['founderAccount'] = ApiClient.convertToType(data['founderAccount'], 'String');
      }
      if (data.hasOwnProperty('newKey')) {
        obj['newKey'] = SimpleKey.constructFromObject(data['newKey']);
      }
      if (data.hasOwnProperty('signature')) {
        obj['signature'] = Signature.constructFromObject(data['signature']);
      }
      if (data.hasOwnProperty('hash')) {
        obj['hash'] = ApiClient.convertToType(data['hash'], 'String');
      }
      if (data.hasOwnProperty('fee')) {
        obj['fee'] = ApiClient.convertToType(data['fee'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Account to purchase
   * @member {String} accountNumber
   */
  exports.prototype['accountNumber'] = undefined;
  /**
   * Founder account, who will pay the price
   * @member {String} founderAccount
   */
  exports.prototype['founderAccount'] = undefined;
  /**
   * @member {module:model/SimpleKey} newKey
   */
  exports.prototype['newKey'] = undefined;
  /**
   * @member {module:model/Signature} signature
   */
  exports.prototype['signature'] = undefined;
  /**
   * Transaction hash to sign the transaction
   * @member {String} hash
   */
  exports.prototype['hash'] = undefined;
  /**
   * Transaction fee, if any, otherwise zero
   * @member {Number} fee
   */
  exports.prototype['fee'] = undefined;


  /**
   * Returns Account to purchase
   * @return {String}
   */
  exports.prototype.getAccountNumber = function() {
    return this['accountNumber'];
  }

  /**
   * Sets Account to purchase
   * @param {String} accountNumber Account to purchase
   */
  exports.prototype.setAccountNumber = function(accountNumber) {
    this['accountNumber'] = accountNumber;
  }


  /**
   * Returns Founder account, who will pay the price
   * @return {String}
   */
  exports.prototype.getFounderAccount = function() {
    return this['founderAccount'];
  }

  /**
   * Sets Founder account, who will pay the price
   * @param {String} founderAccount Founder account, who will pay the price
   */
  exports.prototype.setFounderAccount = function(founderAccount) {
    this['founderAccount'] = founderAccount;
  }


  /**
   * @return {module:model/SimpleKey}
   */
  exports.prototype.getNewKey = function() {
    return this['newKey'];
  }

  /**
   * @param {module:model/SimpleKey} newKey
   */
  exports.prototype.setNewKey = function(newKey) {
    this['newKey'] = newKey;
  }


  /**
   * @return {module:model/Signature}
   */
  exports.prototype.getSignature = function() {
    return this['signature'];
  }

  /**
   * @param {module:model/Signature} signature
   */
  exports.prototype.setSignature = function(signature) {
    this['signature'] = signature;
  }


  /**
   * Returns Transaction hash to sign the transaction
   * @return {String}
   */
  exports.prototype.getHash = function() {
    return this['hash'];
  }

  /**
   * Sets Transaction hash to sign the transaction
   * @param {String} hash Transaction hash to sign the transaction
   */
  exports.prototype.setHash = function(hash) {
    this['hash'] = hash;
  }


  /**
   * Returns Transaction fee, if any, otherwise zero
   * @return {Number}
   */
  exports.prototype.getFee = function() {
    return this['fee'];
  }

  /**
   * Sets Transaction fee, if any, otherwise zero
   * @param {Number} fee Transaction fee, if any, otherwise zero
   */
  exports.prototype.setFee = function(fee) {
    this['fee'] = fee;
  }



  return exports;
}));


