import {Db} from 'mongodb';

class TagService {
    constructor(private _db: Db) {}

    getMany() {
        return this._db.collection('tags').find({}).toArray()
            .then((tags: any) => tags.map((t: any) => t._id));
    }

    save(tag: any) {
        this._db.collection('tags').updateOne({_id: tag}, {_id: tag}, {upsert: true});
    }

    remove(tag: any) {
        return this._db.collection('tags').deleteOne({_id: tag})
            .then(() => true);
    }
}

export default TagService;
