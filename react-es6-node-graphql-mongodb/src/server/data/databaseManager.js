import {MongoClient} from 'mongodb';

class DatabaseManager {
    connect(connectionString) {
        return MongoClient.connect(connectionString)
            .then(db => {
                // make sure ideas collection exists
                db.collection('ideas', { }, (err, coll) => {
                    if (err) {
                        db.createCollection('ideas', (err, result) => {
                            if (err) {
                                throw new Error(
                                    'Error creating full text index on Ideas collection: ' + err);
                            }
                        });
                    }
                });

                // ensure full text index on ideas collection exists
                db.ensureIndex('ideas',
                    {
                        name: 'text',
                        summary: 'text',
                        benefits: 'text',
                        details: 'text',
                        tags: 'text',
                        skills: 'text',
                        technologies: 'text'
                    },
                    {
                        weights: {
                            name: 10,
                            summary: 8,
                            benefits: 3,
                            details: 3
                        }
                    },
                    (err, indexname) => {
                        if (err) {
                            throw new Error(
                                'Error creating full text index on Ideas collection: ' + err);
                        }
                    }
                );

                // make sure users collection exists
                db.collection('users', { }, (err, coll) => {
                    if (err) {
                        db.createCollection('users', (err, result) => {
                            if (err) {
                                throw new Error(
                                    'Error creating full text index on Users collection: ' + err);
                            }
                        });
                    }
                });

                // ensure index exists on users collection for username field
                db.ensureIndex('users', { username: 1});

                // ensure full text index on users collection exists
                db.ensureIndex('users',
                    {
                        username: 'text',
                        firstName: 'text',
                        lastName: 'text',
                        email: 'text'
                    },
                    {
                        weights: {
                            username: 5,
                            firstName: 7,
                            lastName: 7,
                            email: 3
                        }
                    },
                    (err, indexname) => {
                        if (err) {
                            throw new Error(
                                'Error creating full text index on Users collection: ' + err);
                        }
                    }
                );

                return db;
            });
    }
}

export default DatabaseManager;
