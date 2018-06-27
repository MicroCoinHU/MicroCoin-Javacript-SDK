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

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Account', 'model/ChangeKeyRequest', 'model/MicroCoinError', 'model/PurchaseAccountRequest', 'model/Signature', 'model/SimpleKey', 'model/TransactionRequest', 'model/ChangeKey', 'model/PurchaseAccount', 'model/Transaction', 'api/AccountApi', 'api/TransactionApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/Account'), require('./model/ChangeKeyRequest'), require('./model/MicroCoinError'), require('./model/PurchaseAccountRequest'), require('./model/Signature'), require('./model/SimpleKey'), require('./model/TransactionRequest'), require('./model/ChangeKey'), require('./model/PurchaseAccount'), require('./model/Transaction'), require('./api/AccountApi'), require('./api/TransactionApi'));
  }
}(function(ApiClient, Account, ChangeKeyRequest, MicroCoinError, PurchaseAccountRequest, Signature, SimpleKey, TransactionRequest, ChangeKey, PurchaseAccount, Transaction, AccountApi, TransactionApi) {
  'use strict';

  /**
   * MicroCoin Javascript SDK.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var MicroCoin = require('index'); // See note below*.
   * var xxxSvc = new MicroCoin.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new MicroCoin.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new MicroCoin.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new MicroCoin.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 1.0.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The Account model constructor.
     * @property {module:model/Account}
     */
    Account: Account,
    /**
     * The ChangeKeyRequest model constructor.
     * @property {module:model/ChangeKeyRequest}
     */
    ChangeKeyRequest: ChangeKeyRequest,
    /**
     * The MicroCoinError model constructor.
     * @property {module:model/MicroCoinError}
     */
    MicroCoinError: MicroCoinError,
    /**
     * The PurchaseAccountRequest model constructor.
     * @property {module:model/PurchaseAccountRequest}
     */
    PurchaseAccountRequest: PurchaseAccountRequest,
    /**
     * The Signature model constructor.
     * @property {module:model/Signature}
     */
    Signature: Signature,
    /**
     * The SimpleKey model constructor.
     * @property {module:model/SimpleKey}
     */
    SimpleKey: SimpleKey,
    /**
     * The TransactionRequest model constructor.
     * @property {module:model/TransactionRequest}
     */
    TransactionRequest: TransactionRequest,
    /**
     * The ChangeKey model constructor.
     * @property {module:model/ChangeKey}
     */
    ChangeKey: ChangeKey,
    /**
     * The PurchaseAccount model constructor.
     * @property {module:model/PurchaseAccount}
     */
    PurchaseAccount: PurchaseAccount,
    /**
     * The Transaction model constructor.
     * @property {module:model/Transaction}
     */
    Transaction: Transaction,
    /**
     * The AccountApi service constructor.
     * @property {module:api/AccountApi}
     */
    AccountApi: AccountApi,
    /**
     * The TransactionApi service constructor.
     * @property {module:api/TransactionApi}
     */
    TransactionApi: TransactionApi
  };

  return exports;
}));
