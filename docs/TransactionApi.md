# MicroCoin.TransactionApi

All URIs are relative to *http://rider.microcoin.hu*

Method | HTTP request | Description
------------- | ------------- | -------------
[**commitTransaction**](TransactionApi.md#commitTransaction) | **POST** /api/Transaction/commit | Commit a signed transaction
[**getTransaction**](TransactionApi.md#getTransaction) | **GET** /api/Transaction/{ophash} | Retrieve single transaction by hash
[**startTransaction**](TransactionApi.md#startTransaction) | **POST** /api/Transaction/start | Create transaction for sign


<a name="commitTransaction"></a>
# **commitTransaction**
> Transaction commitTransaction(data)

Commit a signed transaction

After you created and signed your transaction, you need to commit it.

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.TransactionApi();

var data = new MicroCoin.TransactionRequest(); // TransactionRequest | The signed transaction


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.commitTransaction(data, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **data** | [**TransactionRequest**](TransactionRequest.md)| The signed transaction | 

### Return type

[**Transaction**](Transaction.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="getTransaction"></a>
# **getTransaction**
> Transaction getTransaction(ophash)

Retrieve single transaction by hash

If you know the transaction hash (ophash), you can retreive the transaction details

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.TransactionApi();

var ophash = "ophash_example"; // String | Transaction hash


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getTransaction(ophash, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ophash** | **String**| Transaction hash | 

### Return type

[**Transaction**](Transaction.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="startTransaction"></a>
# **startTransaction**
> TransactionRequest startTransaction(data)

Create transaction for sign

To send coins you need to create and send transactions. Using this method you can validate your transaction and you will get a transaction hash. This is the hash what you need to sign using your private key, then you can commit your transaction with your valid signature

### Example
```javascript
var MicroCoin = require('micro_coin');

var apiInstance = new MicroCoin.TransactionApi();

var data = new MicroCoin.TransactionRequest(); // TransactionRequest | Basic transaction data


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.startTransaction(data, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **data** | [**TransactionRequest**](TransactionRequest.md)| Basic transaction data | 

### Return type

[**TransactionRequest**](TransactionRequest.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

