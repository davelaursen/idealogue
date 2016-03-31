var noop = function(){};

module.exports = function(_db) {
    var db = _db;

    this.getAll = getAll;
    this.save = save;
    this.remove = remove;

    function getAll(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('skills').find().toArray(function(err, skills) {
            if (err) {
                error(err);
            } else {
                var results = [];
                if (skills !== null) {
                    for (var i = 0; i < skills.length; i++) {
                        results[i] = skills[i]._id;
                    }
                }
                success(results);
            }
        });
    }

    function save(skill, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        var collection = db.collection('skills');
        collection.find({"_id": skill}).toArray(function(err, skills) {
            if (err) {
                error(err);
            } else {
                if (!skills || skills.length === 0) {
                    var doc = {"_id": skill};
                    collection.insertOne(doc, function(err, result) {
                        if (err || result.insertedCount !== 1) {
                            error(err);
                        } else {
                            success(doc, true);
                        }
                    });
                } else {
                    success(skills[0], false);
                }
            }
        });
    }

    function remove(skill, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('skills').deleteOne({"_id": skill}, function(err, result) {
            if (err) {
                error(err);
            } else {
                success(result.deletedCount === 1);
            }
        });
    }
};
