var DataHelper = require('../helpers/dataHelper.js'),
    noop = function(){};

module.exports = function(_db) {
    var db = _db,
        dataHelper = new DataHelper();

    this.getMany = function(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('technologies');
        collection.find().toArray(function(err, docs) {
            if (err) {
                error(err);
            }
            else {
                var technologies = [];
                if(docs !== null) {
                    for (var i = 0; i < docs.length; i++) {
                        technologies[i] = docs[i]._id;
                    }
                }
                success(technologies);
            }
        });
    };

    this.save = function(technology, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('technologies');
        collection.find({"_id": technology}).nextObject([], function(err, doc) {
            if (err) {
                error(err);
            }
            else {
                if (doc === null) {
                    doc = {"_id": technology};
                    collection.insert(doc, {}, function(err, objects) {
                        if(err) {
                            error(err);
                        }
                        else if (objects !== null) {
                            success(doc, true);
                        }
                    });
                }
                else {
                    success(doc, false);
                }
            }
        });
    };

    this.remove = function(technology, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('technologies');
        collection.remove({"_id": technology}, {}, function(err, count) {
            if(err) {
                error(err);
            }
            else {
                success(count !== 0);
            }
        });
    };
};