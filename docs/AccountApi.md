# MicroCoin.AccountApi

All URIs are relative to *http://rider.microcoin.hu*

Method | HTTP request | Description
------------- | ------------- | -------------
[**commitChangeKey**](AccountApi.md#commitChangeKey) | **POST** /api/Account/change-key/commit | Commit change key transaction
[**commitPurchaseAccount**](AccountApi.md#commitPurchaseAccount) | **POST** /api/Account/purchase/commit | Commit signed Purchase account transaction
[**getAccount**](AccountApi.md#getAccount) | **GET** /api/Account/{AccountNumber} | Account detils
[**getOffers**](AccountApi.md#getOffers) | **GET** /api/Account/offers | Get list of accounts for sale
[**getTransactions**](AccountApi.md#getTransactions) | **GET** /api/Account/{AccountNumber}/history | Retrieve account transaction history
[**myAccounts**](AccountApi.md#myAccounts) | **POST** /api/Account/list | Get a list of accounts belonging to the key
[**startChangeKey**](AccountApi.md#startChangeKey) | **POST** /api/Account/change-key/start | Create new change key transaction
[**startPurchaseAccount**](AccountApi.md#startPurchaseAccount) | **POST** /api/Account/purchase/start | Create purchase account transaction


<a name="commitChangeKey"></a>
# **commitChangeKey**
> ChangeKey commitChangeKey(changeKey)

Commit change key transaction

With the change key transaction you can transfer your account to a new owner. To send a new changekey transaction you need to create a transaction using the StartChangeKey method,  then sign it with your private key. You can send your transaction using this method.

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.AccountApi();

var changeKey = new MicroCoin.ChangeKeyRequest(); // ChangeKeyRequest | The signed transaction


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.commitChangeKey(changeKey, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **changeKey** | [**ChangeKeyRequest**](ChangeKeyRequest.md)| The signed transaction | 

### Return type

[**ChangeKey**](ChangeKey.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="commitPurchaseAccount"></a>
# **commitPurchaseAccount**
> PurchaseAccount commitPurchaseAccount(data)

Commit signed Purchase account transaction

If you created and signed your \&quot;Purchase account\&quot; transaction you need to send it into the network. Call this method to send and commit your signed \&quot;Purchase account\&quot; transaction.

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.AccountApi();

var data = new MicroCoin.PurchaseAccountRequest(); // PurchaseAccountRequest | Signed transaction


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.commitPurchaseAccount(data, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **data** | [**PurchaseAccountRequest**](PurchaseAccountRequest.md)| Signed transaction | 

### Return type

[**PurchaseAccount**](PurchaseAccount.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="getAccount"></a>
# **getAccount**
> Account getAccount(accountNumber)

Account detils

You can retrieve details (balance, name, type, etc.) of any account, if you know the account number.

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.AccountApi();

var accountNumber = "accountNumber_example"; // String | Account number, example: 1-22, or 1


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAccount(accountNumber, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accountNumber** | **String**| Account number, example: 1-22, or 1 | 

### Return type

[**Account**](Account.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="getOffers"></a>
# **getOffers**
> [Account] getOffers()

Get list of accounts for sale

This is the list of accounts for sale.             You can purchase accounts if you have enough MicroCoin in your founder account.             The account price will be deducted from the founder account balance.             You must sign the transaction with the founder account private key.             

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.AccountApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getOffers(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[Account]**](Account.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="getTransactions"></a>
# **getTransactions**
> [Transaction] getTransactions(accountNumber, opts)

Retrieve account transaction history

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.AccountApi();

var accountNumber = "accountNumber_example"; // String | Account number to 

var opts = { 
  'start': 56, // Number | Start from
  'max': 56 // Number | Maximum lines to receive
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getTransactions(accountNumber, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accountNumber** | **String**| Account number to  | 
 **start** | **Number**| Start from | [optional] 
 **max** | **Number**| Maximum lines to receive | [optional] 

### Return type

[**[Transaction]**](Transaction.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="myAccounts"></a>
# **myAccounts**
> [Account] myAccounts(key)

Get a list of accounts belonging to the key

Every account belongs to a public key. If you know the public key you can retrieve the list of accounts belonging to the key.

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.AccountApi();

var key = new MicroCoin.SimpleKey(); // SimpleKey | The public key


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.myAccounts(key, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | [**SimpleKey**](SimpleKey.md)| The public key | 

### Return type

[**[Account]**](Account.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="startChangeKey"></a>
# **startChangeKey**
> ChangeKeyRequest startChangeKey(changeKey)

Create new change key transaction

With the change key transaction you can transfer your account to a new owner. To send a new changekey transaction you need to create a transaction using this this method,  then sign it with your private key. You can send your transaction using the CommitChangeKey method.

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.AccountApi();

var changeKey = new MicroCoin.ChangeKeyRequest(); // ChangeKeyRequest | Initial transaction data


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.startChangeKey(changeKey, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **changeKey** | [**ChangeKeyRequest**](ChangeKeyRequest.md)| Initial transaction data | 

### Return type

[**ChangeKeyRequest**](ChangeKeyRequest.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="startPurchaseAccount"></a>
# **startPurchaseAccount**
> PurchaseAccountRequest startPurchaseAccount(data)

Create purchase account transaction

If you want to purchase an account you need to create a new transaction, sign it then send it into the newtwork. This method creates a new transaction and a hash for you. You need to sign the hash then commit your transaction with the CommitPurchaseAccount method

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.AccountApi();

var data = new MicroCoin.PurchaseAccountRequest(); // PurchaseAccountRequest | Transaction data


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.startPurchaseAccount(data, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **data** | [**PurchaseAccountRequest**](PurchaseAccountRequest.md)| Transaction data | 

### Return type

[**PurchaseAccountRequest**](PurchaseAccountRequest.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

