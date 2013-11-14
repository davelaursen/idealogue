var DataHelper = require('../helpers/dataHelper.js'),
    noop = function(){};

module.exports = function(_db) {
    var db = _db,
        dataHelper = new DataHelper();

    this.getMany = function(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('tags');
        collection.find().toArray(function(err, docs) {
            if (err) {
                error(err);
            }
            else {
                var tags = [];
                if(docs !== null) {
                    for (var i = 0; i < docs.length; i++) {
                        tags[i] = docs[i]._id;
                    }
                }
                success(tags);
            }
        });
    };

    this.save = function(tag, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('tags');
        collection.find({"_id": tag}).nextObject([], function(err, doc) {
            if (err) {
                error(err);
            }
            else {
                if (doc === null) {
                    doc = {"_id": tag};
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

    this.remove = function(tag, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('tags');
        collection.remove({"_id": tag}, {}, function(err, count) {
            if(err) {
                error(err);
            }
            else {
                success(count !== 0);
            }
        });
    };
};