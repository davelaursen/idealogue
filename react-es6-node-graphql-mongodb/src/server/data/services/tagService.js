class TagService {
    constructor(db) {
        this._db = db;
    }

    getMany() {
        return this._db.collection('tags').find().toArray()
            .then(tags => tags.map(t => t._id));
    }

    save(tag) {
        this._db.collection('tags').updateOne({_id: tag}, {_id: tag}, {upsert: true});
    }

    remove(tag) {
        return this._db.collection('tags').deleteOne({_id: tag})
            .then(() => true);
    }
}

export default TagService;
