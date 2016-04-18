class SkillService {
    constructor(db) {
        this._db = db;
    }

    getMany() {
        return this._db.collection('skills').find().toArray()
            .then(skills => skills.map(s => s._id));
    }

    save(skill) {
        this._db.collection('skills').updateOne({_id: skill}, {_id: skill}, {upsert: true});
    }

    remove(skill) {
        return this._db.collection('skills').deleteOne({_id: skill})
            .then(() => true);
    }
}

export default SkillService;
