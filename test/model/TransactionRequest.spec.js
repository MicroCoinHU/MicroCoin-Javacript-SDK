/**
 * MicroCoin API
 * MicroCoin rider is an API server for the MicroCoin ecosystem.  It acts as the interface between MicroCoin network and applications that want to access the MicroCoin network.  It allows you to submit transactions to the network, check the status of accounts, subscribe to transactions, etc.  Rider provides a RESTful API to allow client applications to interact with the MicroCoin network.  You can communicate with Rider using cURL or just your web browser. However, if you’re building a client application, you’ll likely want to use a MicroCoin SDK in the language of your client
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.MicroCoinApi);
  }
}(this, function(expect, MicroCoinApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new MicroCoinApi.TransactionRequest();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('TransactionRequest', function() {
    it('should create an instance of TransactionRequest', function() {
      // uncomment below and update the code to test TransactionRequest
      //var instane = new MicroCoinApi.TransactionRequest();
      //expect(instance).to.be.a(MicroCoinApi.TransactionRequest);
    });

    it('should have the property amount (base name: "amount")', function() {
      // uncomment below and update the code to test the property amount
      //var instane = new MicroCoinApi.TransactionRequest();
      //expect(instance).to.be();
    });

    it('should have the property fee (base name: "fee")', function() {
      // uncomment below and update the code to test the property fee
      //var instane = new MicroCoinApi.TransactionRequest();
      //expect(instance).to.be();
    });

    it('should have the property payload (base name: "payload")', function() {
      // uncomment below and update the code to test the property payload
      //var instane = new MicroCoinApi.TransactionRequest();
      //expect(instance).to.be();
    });

    it('should have the property sender (base name: "sender")', function() {
      // uncomment below and update the code to test the property sender
      //var instane = new MicroCoinApi.TransactionRequest();
      //expect(instance).to.be();
    });

    it('should have the property target (base name: "target")', function() {
      // uncomment below and update the code to test the property target
      //var instane = new MicroCoinApi.TransactionRequest();
      //expect(instance).to.be();
    });

    it('should have the property hash (base name: "hash")', function() {
      // uncomment below and update the code to test the property hash
      //var instane = new MicroCoinApi.TransactionRequest();
      //expect(instance).to.be();
    });

    it('should have the property signature (base name: "signature")', function() {
      // uncomment below and update the code to test the property signature
      //var instane = new MicroCoinApi.TransactionRequest();
      //expect(instance).to.be();
    });

  });

}));