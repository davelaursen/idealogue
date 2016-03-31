var DataHelper = require('../helpers/dataHelper.js');
var uuid = require('node-uuid');
var noop = function(){};

module.exports = function(_db) {
    var db = _db;
    var dataHelper = new DataHelper();

    this.getByID = getByID;
    this.getByUsername = getByUsername;
    this.getAll = getAll;
    this.search = search;
    this.insert = insert;
    this.update = update;
    this.remove = remove;

    function getByID(userId, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('users').find({"_id": userId}).toArray(function(err, users) {
            if (err) {
                error(err);
            } else if (users && users.length > 0) {
                dataHelper.replaceUnderscoreId(users[0]);
                success(users[0]);
            } else {
                success(null);
            }
        });
    }

    function getByUsername(username, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('users').find({"username": username}).toArray(function(err, users) {
            if (err) {
                error(err);
            } else if (users && users.length > 0) {
                dataHelper.replaceUnderscoreId(users[0]);
                success(users[0]);
            } else {
                success(null);
            }
        });
    }

    function getAll(error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('users').find().toArray(function(err, users) {
            if (err) {
                error(err);
            } else {
                if (users !== null) {
                    for (var i = 0; i < users.length; i++) {
                        dataHelper.replaceUnderscoreId(users[i]);
                    }
                }
                success(users);
            }
        });
    }

    function search(search, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('users').find(
            {'$text': {'$search': search}},
            {score: {'$meta': 'textScore'}},
            {sort: {score: {'$meta': 'textScore'}}}
        ).toArray(function(err, users) {
            if (err) {
                error(err);
            } else {
                if (users !== null) {
                    for (var i = 0; i < users.length; i++) {
                        dataHelper.replaceUnderscoreId(users[i]);
                    }
                }
                success(users);
            }
        });
    }

    function insert(obj, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        obj.id = uuid.v1();
        dataHelper.replaceId(obj);

        db.collection('users').insertOne(obj, function(err, result) {
            if (err || result.insertedCount !== 1) {
                error(err);
            } else {
                var user = result.ops[0];
                dataHelper.replaceUnderscoreId(user);
                success(user);
            }
        });
    }

    function update(obj, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        dataHelper.replaceId(obj);

        db.collection('users').updateOne({"_id": obj._id}, obj, function(err, result) {
            if (err) {
                error(err);
            } else {
                success(result.modifiedCount === 1);
            }
        });
    }

    function remove(userId, error, success) {
        if (!error) { error = noop; }
        if (!success) { success = noop; }

        db.collection('users').deleteOne({"_id": userId}, function(err, result) {
            if (err) {
                error(err);
            } else {
                success(result.deletedCount === 1);
            }
        });
    }
};
