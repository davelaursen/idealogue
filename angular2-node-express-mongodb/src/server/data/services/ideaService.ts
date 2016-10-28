import * as uuid from 'node-uuid';
import {Db} from 'mongodb';
import SkillService from './skillService';
import TagService from './tagService';
import TechnologyService from './technologyService';

class IdeaService {
    constructor(private _db: Db,
        private _skillService: SkillService,
        private _tagService: TagService,
        private _techService: TechnologyService) {
    }

    getMany(filter?: {}) {
        return this._db.collection('ideas').find(filter || {}).toArray();
    }

    search(searchStr: string) {
        return this._db.collection('ideas').find(
            {'$text': {'$search': searchStr}},
            {score: {'$meta': 'textScore'}},
            <any>{sort: {score: {'$meta': 'textScore'}}}
        ).toArray();
    }

    getById(id: string) {
        return this._db.collection('ideas').find({_id: id}).toArray()
            .then((result: any) => {
                if (result.length === 1) {
                    return result[0];
                } else {
                    return null;
                }
            });
    }

    insert(idea: any) {
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

    update(idea: any) {
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

    remove(id: string) {
        return this._db.collection('ideas').deleteOne({_id: id})
            .then(() => true);
    }
}

export default IdeaService;
