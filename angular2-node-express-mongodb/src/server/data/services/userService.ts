import * as uuid from 'node-uuid';
import {Db} from 'mongodb';

class UserService {
    constructor(private _db: Db) {}

    getMany(filter? : {}) {
        return this._db.collection('users').find(filter || {}).toArray();
    }

    search(searchStr: string) {
        return this._db.collection('users').find(
            {'$text': {'$search': searchStr}},
            {score: {'$meta': 'textScore'}},
            <any>{sort: {score: {'$meta': 'textScore'}}}
        ).toArray();
    }

    getById(id: string) {
        return this._db.collection('users').find({_id: id}).toArray()
            .then((result: any) => {
                if (result.length === 1) {
                    return result[0];
                } else {
                    return null;
                }
            });
    }

    getByUsername(username: string) {
        return this._db.collection('users').find({username: username}).toArray()
            .then((result: any) => {
                if (result.length === 1) {
                    return result[0];
                } else {
                    return null;
                }
            });
    }

    insert(user: any) {
        user._id = uuid.v1();
        return this._db.collection('users').insertOne(user)
            .then(() => user);
    }

    update(user: any) {
        return this._db.collection('users').updateOne({_id: user._id}, user)
            .then(() => true);
    }

    remove(id: string) {
        return this._db.collection('users').deleteOne({_id: id})
            .then(() => true);
    }
}

export default UserService;
