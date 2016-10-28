import {MongoClient} from 'mongodb';

class DatabaseManager {
    connect(connectionString: string) {
        return MongoClient.connect(connectionString)
            .then((db: any) => {
                // make sure ideas collection exists
                db.collection('ideas', { }, (err: any, coll: any) => {
                    if (err) {
                        db.createCollection('ideas')
                            .catch((err: any) => {
                                throw new Error('Error creating Ideas collection: ' + err);
                            });
                    }
                });

                // make sure users collection exists
                db.collection('users', { }, (err: any, coll: any) => {
                    if (err) {
                        db.createCollection('ideas')
                            .catch((err: any) => {
                                throw new Error('Error creating Users collection: ' + err);
                            });
                    }
                });

                // ensure index exists on users collection for username field
                db.createIndex('users', { username: 1});

                return db;
            });
    }
}

export default DatabaseManager;
