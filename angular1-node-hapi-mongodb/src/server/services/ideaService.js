var DataHelper = require('../helpers/dataHelper.js');
var uuid = require('node-uuid');
var noop = function(){};

module.exports = function(_db) {
    var db = _db;
    var dataHelper = new DataHelper();

    this.getByID = getByID;
    this.getAll = getAll;
    this.search = search;
    this.insert = insert;
    this.update = update;
    this.remove = remove;

    function getByID(ideaId, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('ideas').find({"_id": ideaId}).toArray(function(err, ideas) {
            if (err) {
                error(err);
            } else if (ideas && ideas.length > 0) {
                dataHelper.replaceUnderscoreId(ideas[0]);
                success(ideas[0]);
            } else {
                success(null);
            }
        });
    }

    function getAll(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('ideas').find().toArray(function(err, ideas) {
            if (err) {
                error(err);
            } else {
                if (ideas !== null) {
                    for (var i = 0; i < ideas.length; i++) {
                        dataHelper.replaceUnderscoreId(ideas[i]);
                    }
                }
                success(ideas);
            }
        });
    }

    function search(search, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('ideas').find(
            {'$text': {'$search': search}},
            {score: {'$meta': 'textScore'}},
            {sort: {score: {'$meta': 'textScore'}}}
        ).toArray(function(err, ideas) {
            if (err) {
                error(err);
            } else {
                if (ideas !== null) {
                    for (var i = 0; i < ideas.length; i++) {
                        dataHelper.replaceUnderscoreId(ideas[i]);
                    }
                }
                success(ideas);
            }
        });
    }

    function insert(obj, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        obj.id = uuid.v1();
        dataHelper.replaceId(obj);

        db.collection('ideas').insertOne(obj, function(err, result) {
            if (err || result.insertedCount !== 1) {
                error(err);
            } else {
                var idea = result.ops[0];
                dataHelper.replaceUnderscoreId(idea);
                success(idea);
            }
        });
    }

    function update(obj, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        dataHelper.replaceId(obj);

        db.collection('ideas').updateOne({"_id": obj._id}, obj, function(err, result) {
            if (err) {
                error(err);
            } else {
                success(result.modifiedCount === 1);
            }
        });
    }

    function remove(ideaId, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('ideas').deleteOne({"_id": ideaId}, function(err, result) {
            if (err) {
                error(err);
            } else {
                success(result.deletedCount === 1);
            }
        });
    }
};
