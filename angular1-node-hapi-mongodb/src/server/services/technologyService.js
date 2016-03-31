var noop = function(){};

module.exports = function(_db) {
    var db = _db;

    this.getAll = getAll;
    this.save = save;
    this.remove = remove;

    function getAll(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('technologies').find().toArray(function(err, techs) {
            if (err) {
                error(err);
            } else {
                var results = [];
                if (techs !== null) {
                    for (var i = 0; i < techs.length; i++) {
                        results[i] = techs[i]._id;
                    }
                }
                success(results);
            }
        });
    }

    function save(technology, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('technologies');
        collection.find({"_id": technology}).toArray(function(err, techs) {
            if (err) {
                error(err);
            } else {
                if (!techs || techs.length === 0) {
                    var doc = {"_id": technology};
                    collection.insertOne(doc, function(err, result) {
                        if (err || result.insertedCount !== 1) {
                            error(err);
                        } else {
                            success(doc, true);
                        }
                    });
                } else {
                    success(techs[0], false);
                }
            }
        });
    }

    function remove(technology, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('technologies').deleteOne({"_id": technology}, function(err, result) {
            if (err) {
                error(err);
            } else {
                success(result.deletedCount === 1);
            }
        });
    }
};
