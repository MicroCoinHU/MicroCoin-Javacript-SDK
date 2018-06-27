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
   * _MicroCoin_APIMicroCoin_rider_is_an_API_server_for_the_MicroCoin_ecosystem_It_acts_as_the_interface_between_MicroCoin_network_and_applications_that_want_to_access_the_MicroCoin_network_It_allows_you_to_submit_transactions_to_the_network_check_the_status_of_accounts_subscribe_to_transactions_etc_Rider_provides_a_RESTful_API_to_allow_client_applications_to_interact_with_the_MicroCoin_network_You_can_communicate_with_Rider_using_cURL_or_just_your_web_browser__However_if_youre_building_a_client_application_youll_likely_want_to_use_a_MicroCoin_SDK_in_the_language_of_your_client_PHP_quickstart_guide_Download_the_client_SDKFirst_you_need_a_MicroCoin_client_SDK__You_can_download_it_from__here__or_clone_from_our__Github_httpsgithub_com_repository_git_clone_https_Keys_and_signaturesMicroCoin_works_with_ECDSA_signatures_so_you_need_to_work_with_ECDSA_keys_and_signatures_You_can_use_your_favorite_ECDSA_package_or_use_simplitoelliptic_php__We_are_using_simplitoelliptic_php_in_our_demos__Generate_new_ECDSA_keyPairIf_you_have_no_keys_you_must_generate_a_new_key_then_store_it_in_a_secure_place_Please_notice_if_you_lose_your_key_you_lose_your_accounts_and_your_coinsphpuse_EllipticECec__new_EC_secp256k1myKey__ec_genKeyPair__Import_ECDSA_private_keyIf_you_have_a_key_you_can_import_it_from_a_hexadecimal_string_phpuse_EllipticECec__new_EC_secp256k1myKey__ec_keyFromPrivate_PRIVATE_KEY_IN_HEX_List_your_accountsIf_you_have_accounts_you_can_list_there__First_time_you_have_no_accounts_so_you_need_get_one_Every_account_belongs_to_a_public_key__One_public_key_can_be_used_for_multiple_accounts_phpapi__new_MicroCoinApiAccountApi__You_must_convert_the_ECPoint_to_a_MicroCoin_SimpleKeykey__new_MicroCoinModelSimpleKey_key_setCurveType_secp256k1key_setX_myKey_getPublic__getX__toString_16key_setY_myKey_getPublic__getY__toString_16print_r_api_myAccounts_key_List_accounts_for_saleYou_can_purchase_accounts_but_you_need_to_know_which_accounts_are_for_sale_phpapi__new_MicroCoinApiAccountApi_print_r_api_getOffers__Purchase_accountYou_can_purchase_any_account_for_sale_if_you_have_enough_coins_phpapi__new_MicroCoinApiAccountApi__First_convert_your_public_keykey__new_MicroCoinModelSimpleKey______curve_type__secp256k1____x__myKey_getPublic__getX__toString_16____y__myKey_getPublic__getY__toString_16purchaseAccountRequest__new_MicroCoinModelPurchaseAccountRequest___Account_to_purchase_purchaseAccountRequest_setAccountNumber_0_10purchaseAccountRequest_setFee_0_This_account_will_pay_the_price_and_the_feepurchaseAccountRequest_setFounderAccount_1_22___The_new_ownerpurchaseAccountRequest_setNewKey_key__preapare_transactiontransaction__api_startPurchaseAccount_purchaseAccountRequest__Sign_transactionsign__myKey_sign_transaction_getHash__Fill_signaturetransaction_setSignature_new_MicroCoinModelSignature__rsign_r_toString_16_ssign_r_toString_16_Commit_transactionresult__api_commitPurchaseAccount_transaction_You_are_doneprint_r_result_Sending_coinsIf_you_have_enough_balance_you_can_send_coins_from_your_accounts_to_any_valid_account_phpapi__new_MicroCoinApiTransactionApi_sendCoinRequest__new_MicroCoinModelTransactionRequest__Source_accountsendCoinRequest_setSender_0_10_Destination_accountsendCoinRequest_setTarget_1_22_Amount_to_sendsendCoinRequest_setAmount_0_0001_Optinal_feesendCoinRequest_setFee_0_Optional_payloadsendCoinRequest_setPayload_Hello_MicroCoin_Prepare_a_new_transactiontransaction__api_startTransaction_sendCoinRequest_Sign_transaction_with_your_private_key__private_key_what_belongs_to_the_sender_accountsign__myKey_sign_transaction_getHash__Fill_signaturetransaction_setSignature__new_MicroCoinModelSignature__rsign_r_toString_16_ssign_r_toString_16__Commit_transactionresult__api_commitTransaction_transaction_Coins_sentprint_r_result_Change_account_ownerIf_you_want_change_your_account_owner_you_can_do_it_with_change_the_assigned_public_key_phpchangeKeyRequest_setAccountNumber_0_10_Key_of_the_new_ownerchangeKeyRequest_setNewOwnerPublicKey_new_MicroCoinModelSimpleKey______curve_type__secp256k1____x__newKey_getPublic__getX__toString_16____y__newKey_getPublic__getY__toString_16changeKeyRequest_setFee_0_Prepare_transactiontransaction__api_startChangeKey_changeKeyRequest_Fill_signaturetransaction_setSignature__new_MicroCoinModelSignature__rsign_r_toString_16_ssign_r_toString_16__Commit_transactionresult__api_commitPurchaseAccount_transaction_You_are_doneprint_r_result_Javascript_quickstart_guide_Download_the_client_SDKFirst_you_need_a_MicroCoin_client_SDK__You_can_download_it_from__here__or_clone_from_our__Github_httpsgithub_com_repository_git_clone_https_Keys_and_signaturesMicroCoin_works_with_ECDSA_signatures_so_you_need_to_work_with_ECDSA_keys_and_signatures_You_can_use_your_favorite_ECDSA_package_or_use_elliptic_js__We_are_using_elliptic_js_in_our_demos__Generate_new_ECDSA_keyPairIf_you_have_no_keys_you_must_generate_a_new_key_then_store_it_in_a_secure_place_Please_notice_if_you_lose_your_key_you_lose_your_accounts_and_your_coinsjsvar_ec__new_elliptic_ec_secp256k1var_myKey__ec_genKeyPair__Import_ECDSA_private_keyIf_you_have_a_key_you_can_import_it_from_a_hexadecimal_string_jsvar_ec__new_elliptic_ec_secp256k1var_myKey__ec_keyPair__privPRIVATE_KEY_IN_HEX_privEnchex__Export_ECDSA_keySometimes_you_need_save_your_key_or_you_need_to_display_it__You_can_export_your_key_using_this_methodjsvar_exportedKey_____private_keyPair_getPrivate_hex___public________X_keyPair_getPublic__x_toString_16_______Y_keyPair_getPublic__y_toString_16_____List_your_accountsIf_you_have_accounts_you_can_list_there__First_time_you_have_no_accounts_so_you_need_get_one_Every_account_belongs_to_a_public_key__One_public_key_can_be_used_for_multiple_accounts_jsvar_accountApi__new_MicroCoin_AccountApi__Never_send_your_private_keyaccountApi_myAccounts_____curveTypesecp256k1____x_myKey_getPublic__getX_hex____y_myKey_getPublic__getY_hex_then_myAccounts__console_log_myAccounts_Get_single_accountYou_can_request_information_from_a_single_account__You_can_see_the_balance_name_etc__jsvar_accountApi__new_MicroCoin_AccountApi_accountApi_getAccount_0_10_then_account__console_log_account_List_accounts_for_saleYou_can_purchase_accounts_but_you_need_to_know_which_accounts_are_for_sale_jsvar_accountApi__new_MicroCoin_AccountApi_accountApi_getOffers__then_offers__console_log_offers_Purchase_accountYou_can_purchase_any_account_for_sale_if_you_have_enough_coins_jsvar_purchaseRequest__new_MicroCoin_PurchaseAccountRequest_purchaseRequest_setAccountNumber_34689_25__The_account_to_purchasepurchaseRequest_setFounderAccount_1_22____The_founder_account_will_pay_for_the_accountpurchaseRequest_setFee_0___Optional_miner_fee_This_is_key_of_the_new_owner__You_can_use_your_own_key_or_any_key_what_you_want__After_the_purchase_completed_you_can_only_manage_this_account_with_this_keyPairpurchaseRequest_setNewKey_____CurveTypesecp256k1____X_myKey_getPublic__getX_hex____Y_myKey_getPublic__getY_hex_First_prepare_the_transactionaccountApi_startPurchaseAccount_purchaseRequest_then_function__transaction______Now_we_need_to_sign_our_transaction_using_the_founder_account_private_key____var_signature__myKey_sign_transaction_getHash______Now_fill_the_signature_property____transaction_signature___r_signature_r_s_signature_s______Last_we_need_to_commit_our_transaction_and_we_are_done____accountApi_commitPurchaseAccount_transaction_then__responseconsole_log_response_e__console_error_e_Sending_coinsIf_you_have_enough_balance_you_can_send_coins_from_your_accounts_to_any_valid_account_jsvar_transactionApi__new_MicroCoin_TransactionApi_var_sendCoinRequest__new_MicroCoin_TransactionRequest_sendCoinRequest_setSender_0_10__Source_accountsendCoinRequest_setTarget_1_22__Target_accountsendCoinRequest_setAmount_0_0001__Amount_to_sendsendCoinRequest_setFee_0__optional_miner_fee_one_transaction__block__5_min_is_freesendCoinRequest_setPayload_Hello_MicroCoin__optional_payload_First_we_are_creating_a_transactiontransactionApi_startTransaction_sendCoinRequest_then_function__transaction______When_the_transaction_created_we_need_to_sign_the_transaction____var_signature__myKey_sign_transaction_getHash______Now_fill_the_signature_property____transaction_signature___r_signature_r_s_signature_s______Last_we_need_to_commit_our_transaction_and_we_are_done____transactionApi_commitTransaction_transaction_then__responseconsole_log_response_e__console_error_e_Change_account_ownerIf_you_want_change_your_account_owner_you_can_do_it_with_change_the_assigned_public_key_jsvar_request__new_MicroCoin_ChangeKeyRequest_request_setAccountNumber_0_10__The_account_to_change_newKey_Public_key_of_the_new_ownerrequest_setNewOwnerPublicKey_____curveTypesecp256k1____x_newKey_getPublic__getX_hex____y_newKey_getPublic__getY_hex_First_we_are_creating_a_transactionaccountApi_startChangeKey_request_then_function__transaction______When_the_transaction_created_we_need_to_sign_the_transaction_____myKey_key_of_the_current_owner_____var_signature__myKey_sign_transaction_getHash_____transaction_signature___r_signature_r_s_signature_s______Last_we_need_to_commit_our_transaction_and_we_are_done_the_new_owner_can_use_hisher_account____accountApi_commitChangeKey_transaction_then__responseconsole_log_response_e__console_error_e.<br>
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
