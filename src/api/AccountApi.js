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
    define(['ApiClient', 'model/Account', 'model/ChangeKey', 'model/ChangeKeyRequest', 'model/MicroCoinError', 'model/PurchaseAccount', 'model/PurchaseAccountRequest', 'model/SimpleKey', 'model/Transaction'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Account'), require('../model/ChangeKey'), require('../model/ChangeKeyRequest'), require('../model/MicroCoinError'), require('../model/PurchaseAccount'), require('../model/PurchaseAccountRequest'), require('../model/SimpleKey'), require('../model/Transaction'));
  } else {
    // Browser globals (root is window)
    if (!root.MicroCoin) {
      root.MicroCoin = {};
    }
    root.MicroCoin.AccountApi = factory(root.MicroCoin.ApiClient, root.MicroCoin.Account, root.MicroCoin.ChangeKey, root.MicroCoin.ChangeKeyRequest, root.MicroCoin.MicroCoinError, root.MicroCoin.PurchaseAccount, root.MicroCoin.PurchaseAccountRequest, root.MicroCoin.SimpleKey, root.MicroCoin.Transaction);
  }
}(this, function(ApiClient, Account, ChangeKey, ChangeKeyRequest, MicroCoinError, PurchaseAccount, PurchaseAccountRequest, SimpleKey, Transaction) {
  'use strict';

  /**
   * Account service.
   * @module api/AccountApi
   * @version 1.0.0
   */

  /**
   * Constructs a new AccountApi. 
   * @alias module:api/AccountApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the commitChangeKey operation.
     * @callback module:api/AccountApi~commitChangeKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ChangeKey} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Commit change key transaction
     * With the change key transaction you can transfer your account to a new owner. To send a new changekey transaction you need to create a transaction using the StartChangeKey method,  then sign it with your private key. You can send your transaction using this method.
     * @param {module:model/ChangeKeyRequest} changeKey The signed transaction
     * @param {module:api/AccountApi~commitChangeKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ChangeKey}
     */
    this.commitChangeKey = function(changeKey, callback) {
      var postBody = changeKey;

      // verify the required parameter 'changeKey' is set
      if (changeKey === undefined || changeKey === null) {
        throw new Error("Missing the required parameter 'changeKey' when calling commitChangeKey");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = ChangeKey;

      return this.apiClient.callApi(
        '/api/Account/change-key/commit', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the commitPurchaseAccount operation.
     * @callback module:api/AccountApi~commitPurchaseAccountCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PurchaseAccount} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Commit signed Purchase account transaction
     * If you created and signed your \&quot;Purchase account\&quot; transaction you need to send it into the network. Call this method to send and commit your signed \&quot;Purchase account\&quot; transaction.
     * @param {module:model/PurchaseAccountRequest} data Signed transaction
     * @param {module:api/AccountApi~commitPurchaseAccountCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PurchaseAccount}
     */
    this.commitPurchaseAccount = function(data, callback) {
      var postBody = data;

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling commitPurchaseAccount");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = PurchaseAccount;

      return this.apiClient.callApi(
        '/api/Account/purchase/commit', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getAccount operation.
     * @callback module:api/AccountApi~getAccountCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Account} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Account detils
     * You can retrieve details (balance, name, type, etc.) of any account, if you know the account number.
     * @param {String} accountNumber Account number, example: 1-22, or 1
     * @param {module:api/AccountApi~getAccountCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Account}
     */
    this.getAccount = function(accountNumber, callback) {
      var postBody = null;

      // verify the required parameter 'accountNumber' is set
      if (accountNumber === undefined || accountNumber === null) {
        throw new Error("Missing the required parameter 'accountNumber' when calling getAccount");
      }


      var pathParams = {
        'AccountNumber': accountNumber
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = Account;

      return this.apiClient.callApi(
        '/api/Account/{AccountNumber}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getOffers operation.
     * @callback module:api/AccountApi~getOffersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Account>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get list of accounts for sale
     * This is the list of accounts for sale.             You can purchase accounts if you have enough MicroCoin in your founder account.             The account price will be deducted from the founder account balance.             You must sign the transaction with the founder account private key.             
     * @param {module:api/AccountApi~getOffersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Account>}
     */
    this.getOffers = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = [Account];

      return this.apiClient.callApi(
        '/api/Account/offers', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getTransactions operation.
     * @callback module:api/AccountApi~getTransactionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Transaction>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve account transaction history
     * @param {String} accountNumber Account number to 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.start Start from
     * @param {Number} opts.max Maximum lines to receive
     * @param {module:api/AccountApi~getTransactionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Transaction>}
     */
    this.getTransactions = function(accountNumber, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'accountNumber' is set
      if (accountNumber === undefined || accountNumber === null) {
        throw new Error("Missing the required parameter 'accountNumber' when calling getTransactions");
      }


      var pathParams = {
        'AccountNumber': accountNumber
      };
      var queryParams = {
        'start': opts['start'],
        'max': opts['max'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = [Transaction];

      return this.apiClient.callApi(
        '/api/Account/{AccountNumber}/history', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the myAccounts operation.
     * @callback module:api/AccountApi~myAccountsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Account>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a list of accounts belonging to the key
     * Every account belongs to a public key. If you know the public key you can retrieve the list of accounts belonging to the key.
     * @param {module:model/SimpleKey} key The public key
     * @param {module:api/AccountApi~myAccountsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Account>}
     */
    this.myAccounts = function(key, callback) {
      var postBody = key;

      // verify the required parameter 'key' is set
      if (key === undefined || key === null) {
        throw new Error("Missing the required parameter 'key' when calling myAccounts");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = [Account];

      return this.apiClient.callApi(
        '/api/Account/list', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the startChangeKey operation.
     * @callback module:api/AccountApi~startChangeKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ChangeKeyRequest} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create new change key transaction
     * With the change key transaction you can transfer your account to a new owner. To send a new changekey transaction you need to create a transaction using this this method,  then sign it with your private key. You can send your transaction using the CommitChangeKey method.
     * @param {module:model/ChangeKeyRequest} changeKey Initial transaction data
     * @param {module:api/AccountApi~startChangeKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ChangeKeyRequest}
     */
    this.startChangeKey = function(changeKey, callback) {
      var postBody = changeKey;

      // verify the required parameter 'changeKey' is set
      if (changeKey === undefined || changeKey === null) {
        throw new Error("Missing the required parameter 'changeKey' when calling startChangeKey");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = ChangeKeyRequest;

      return this.apiClient.callApi(
        '/api/Account/change-key/start', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the startPurchaseAccount operation.
     * @callback module:api/AccountApi~startPurchaseAccountCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PurchaseAccountRequest} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create purchase account transaction
     * If you want to purchase an account you need to create a new transaction, sign it then send it into the newtwork. This method creates a new transaction and a hash for you. You need to sign the hash then commit your transaction with the CommitPurchaseAccount method
     * @param {module:model/PurchaseAccountRequest} data Transaction data
     * @param {module:api/AccountApi~startPurchaseAccountCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PurchaseAccountRequest}
     */
    this.startPurchaseAccount = function(data, callback) {
      var postBody = data;

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling startPurchaseAccount");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = PurchaseAccountRequest;

      return this.apiClient.callApi(
        '/api/Account/purchase/start', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
