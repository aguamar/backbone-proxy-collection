var assert          = require('assert');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index');

var proxyCollection;
var collection;
var secondaryCollection;

beforeEach(function() {
  collection = new Backbone.Collection([{label: 'a'}]);
  secondaryCollection = new Backbone.Collection([{label: 'c'}]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.on("change")', function() {

  it('Should emit a change event when a models attributes change', function(done) {
    proxyCollection.on('change', function(model) {
      assert.ok(true);
      assert.equal('b', model.get('label'), 'The correct model was passed by the event');
      done();
    });

    collection.at(0).set('label', 'b');
  });

  it('Should emit a change event when a models attributes change after collectionSwitch', function(done) {
    proxyCollection.on('change', function(model) {
      assert.ok(true);
      assert.equal('d', model.get('label'), 'The correct model was passed by the event');
      done();
    });

    proxyCollection.switchCollection(secondaryCollection);
    secondaryCollection.at(0).set('label', 'd');
  });

  it('Should emit a change:attribute event when a models attributes change', function(done) {
    proxyCollection.on('change:label', function(model) {
      assert.ok(true);
      assert.equal('b', model.get('label'), 'The correct model was passed by the event');
      done();
    });

    collection.at(0).set('label', 'b');
  });

  it('Should emit a change:attribute event when a models attributes change after collectionSwitch', function(done) {
    proxyCollection.on('change:label', function(model) {
      assert.ok(true);
      assert.equal('d', model.get('label'), 'The correct model was passed by the event');
      done();
    });

    proxyCollection.switchCollection(secondaryCollection);
    secondaryCollection.at(0).set('label', 'd');
  });

});
