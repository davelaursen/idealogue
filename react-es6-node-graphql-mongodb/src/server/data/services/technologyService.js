class TechnologyService {
    constructor(db) {
        this._db = db;
    }

    getMany() {
        return this._db.collection('technologies').find().toArray()
            .then(techs => techs.map(t => t._id));
    }

    save(tech) {
        this._db.collection('technologies').updateOne({_id: tech}, {_id: tech}, {upsert: true});
    }

    remove(tech) {
        return this._db.collection('technologies').deleteOne({_id: tech})
            .then(() => true);
    }
}

export default TechnologyService;
