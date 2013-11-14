var DataHelper = require('../helpers/dataHelper.js'),
    noop = function(){};

module.exports = function(_db) {
    var db = _db,
        dataHelper = new DataHelper();

    this.getOne = function(ideaId, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('ideas');
        collection.find({"_id": ideaId}).nextObject([], function(err, doc) {
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

    this.getMany = function(search, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('ideas');
        if (search && search !== null) {
            db.command({text:'ideas',search:search}, function(err, result) {
                var results = [];
                if (result && result.results) {
                    for (var j = 0; j < result.results.length; j++) {
                        results[j] = result.results[j].obj;
                    }
                }
                success(results);
            });
        }
        else {
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
        }
    };

    this.create = function(obj, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var semiRandomGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === "x" ? r : (r&0x3|0x8);
            return v.toString(16);
        });

        obj.id = semiRandomGuid;
        dataHelper.replaceId(obj);

        var collection = db.collection('ideas');
        collection.insert(obj, {}, function(err, objects) {
            if(err) {
                error(err);
            }
            else {
                dataHelper.replaceUnderscoreId(obj);
                success(obj);
            }
        });
    };

    this.update = function(obj, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        dataHelper.replaceId(obj);

        var collection = db.collection('ideas');
        collection.findAndModify({"_id": obj._id}, [['id','asc']], obj, {}, function(err, doc) {
            if(err) {
                error(err);
            }
            else {
                success(doc);
            }
        });
    };

    this.remove = function(ideaId, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }
        var collection = db.collection('ideas');
        collection.remove({"_id": ideaId}, {}, function(err, count) {
            if(err) {
                error(err);
            }
            else {
                success(count !== 0);
            }
        });
    };
};