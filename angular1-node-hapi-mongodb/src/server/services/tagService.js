var noop = function(){};

module.exports = function(_db) {
    var db = _db;

    this.getAll = getAll;
    this.save = save;
    this.remove = remove;

    function getAll(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('tags').find().toArray(function(err, tags) {
            if (err) {
                error(err);
            } else {
                var results = [];
                if (tags !== null) {
                    for (var i = 0; i < tags.length; i++) {
                        results[i] = tags[i]._id;
                    }
                }
                success(results);
            }
        });
    }

    function save(tag, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('tags');
        collection.find({"_id": tag}).toArray(function(err, tags) {
            if (err) {
                error(err);
            } else {
                if (!tags || tags.length === 0) {
                    var doc = {"_id": tag};
                    collection.insertOne(doc, function(err, result) {
                        if (err || result.insertedCount !== 1) {
                            error(err);
                        } else {
                            success(doc, true);
                        }
                    });
                } else {
                    success(tags[0], false);
                }
            }
        });
    }

    function remove(tag, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('tags').deleteOne({"_id": tag}, function(err, result) {
            if (err) {
                error(err);
            } else {
                success(result.deletedCount === 1);
            }
        });
    }
};
