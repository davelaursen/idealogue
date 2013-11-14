var DataHelper = require('../helpers/dataHelper.js'),
    noop = function(){};

module.exports = function(_db) {
    var db = _db,
        dataHelper = new DataHelper();

    this.getMany = function(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('skills');
        collection.find().toArray(function(err, docs) {
            if (err) {
                error(err);
            }
            else {
                var skills = [];
                if(docs !== null) {
                    for (var i = 0; i < docs.length; i++) {
                        skills[i] = docs[i]._id;
                    }
                }
                success(skills);
            }
        });
    };

    this.save = function(skill, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('skills');
        collection.find({"_id": skill}).nextObject([], function(err, doc) {
            if (err) {
                error(err);
            }
            else {
                if (doc === null) {
                    doc = {"_id": skill};
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

    this.remove = function(skill, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('skills');
        collection.remove({"_id": skill}, {}, function(err, count) {
            if(err) {
                error(err);
            }
            else {
                success(count !== 0);
            }
        });
    };
};