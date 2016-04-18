import uuid from 'node-uuid';

class UserService {
    constructor(db) {
        this._db = db;
    }

    getMany(filter) {
        return this._db.collection('users').find(filter || {}).toArray();
    }

    search(searchStr) {
        return this._db.collection('users').find(
            {'$text': {'$search': searchStr}},
            {score: {'$meta': 'textScore'}},
            {sort: {score: {'$meta': 'textScore'}}}
        ).toArray();
    }

    getById(id) {
        return this._db.collection('users').findOne({_id: id});
    }

    getByUsername(username) {
        return this._db.collection('users').findOne({username: username});
    }

    insert(user) {
        user._id = uuid.v1();
        return this._db.collection('users').insertOne(user)
            .then(() => user);
    }

    update(user) {
        return this._db.collection('users').updateOne({_id: user._id}, user)
            .then(() => true);
    }

    remove(id) {
        return this._db.collection('users').deleteOne({_id: id})
            .then(() => true);
    }
}

export default UserService;
