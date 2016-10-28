import {Db} from 'mongodb';

class TechnologyService {
    constructor(private _db: Db) {}

    getMany() {
        return this._db.collection('technologies').find({}).toArray()
            .then((techs: any) => techs.map((t: any) => t._id));
    }

    save(tech: any) {
        this._db.collection('technologies').updateOne({_id: tech}, {_id: tech}, {upsert: true});
    }

    remove(tech: any) {
        return this._db.collection('technologies').deleteOne({_id: tech})
            .then(() => true);
    }
}

export default TechnologyService;
