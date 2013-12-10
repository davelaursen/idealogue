var DataHelper = require('../helpers/dataHelper.js'),
    noop = function(){};

module.exports = function(_db) {
    var db = _db,
        dataHelper = new DataHelper();

    this.getOne = function(userId, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('users');
        collection.find({"_id": userId}).nextObject([], function(err, doc) {
            if (err) {
                error(err);
            }
            else {
                if (doc !== null) {
                    dataHelper.replaceUnderscoreId(doc);
                }
                success(doc);
            }
        });
    };

    this.getMany = function(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('users');
        collection.find().toArray(function(err, docs) {
            if (err) {
                error(err);
            }
            else {
                if(docs !== null) {
                    for (var i = 0; i < docs.length; i++) {
                        dataHelper.replaceUnderscoreId(docs[i]);
                    }
                }
                success(docs);
            }
        });
    };

    this.save = function(obj, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        dataHelper.replaceId(obj);

        var collection = db.collection('users');
        collection.update({"_id": obj._id}, obj, {"upsert": true}, function(err) {
            if(err) {
                error(err);
            }
            else {
                success();
            }
        });
    };

    this.remove = function(userId, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('users');
        collection.remove({"_id": userId}, {}, function(err, count) {
            if(err) {
                error(err);
            }
            else {
                success(count !== 0);
            }
        });
    };
};