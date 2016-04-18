import uuid from 'node-uuid';

class IdeaService {
    constructor(db, skillService, tagService, techService) {
        this._db = db;
        this._skillService = skillService;
        this._tagService = tagService;
        this._techService = techService;
    }

    getMany(filter) {
        return this._db.collection('ideas').find(filter || {}).toArray();
    }

    search(searchStr) {
        return this._db.collection('ideas').find(
            {'$text': {'$search': searchStr}},
            {score: {'$meta': 'textScore'}},
            {sort: {score: {'$meta': 'textScore'}}}
        ).toArray();
    }

    getById(id) {
        return this._db.collection('ideas').findOne({_id: id});
    }

    insert(idea) {
        idea._id = uuid.v1();
        return this._db.collection('ideas').insertOne(idea)
            .then(() => {
                for (let skill of idea.skills) {
                    this._skillService.save(skill);
                }
                for (let tag of idea.tags) {
                    this._tagService.save(tag);
                }
                for (let tech of idea.technologies) {
                    this._techService.save(tech);
                }
                return idea;
            });
    }

    update(idea) {
        return this._db.collection('ideas').updateOne({_id: idea._id}, idea)
            .then(() => {
                for (let skill of idea.skills) {
                    this._skillService.save(skill);
                }
                for (let tag of idea.tags) {
                    this._tagService.save(tag);
                }
                for (let tech of idea.technologies) {
                    this._techService.save(tech);
                }
                return true;
            });
    }

    remove(id) {
        return this._db.collection('ideas').deleteOne({_id: id})
            .then(() => true);
    }
}

export default IdeaService;
