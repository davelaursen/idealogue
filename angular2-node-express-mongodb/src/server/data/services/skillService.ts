import {Db} from 'mongodb';

class SkillService {
    constructor(private _db: Db) {}

    getMany() {
        return this._db.collection('skills').find({}).toArray()
            .then((skills: any) => skills.map((s: any) => s._id));
    }

    save(skill: any) {
        this._db.collection('skills').updateOne({_id: skill}, {_id: skill}, {upsert: true});
    }

    remove(skill: any) {
        return this._db.collection('skills').deleteOne({_id: skill})
            .then(() => true);
    }
}

export default SkillService;
