const uri = "mongodb+srv://pgudu2:BgUUfcEcvL0EGtVt@cluster0.n0tmohf.mongodb.net/?retryWrites=true&w=majority";
const fs = require('fs');

const {MongoClient} = require('mongodb');

const dbName = "database1";
const collectionName = "doctors1";
const client = new MongoClient(uri);

async function run(){
    try {
        await client.connect();
        console.log("MongoDB connection happened here");
    } catch (e) {
        console.error(e);
    }
}

async function upload(){
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const path = require('path');
    const dataPath = path.join(__dirname, 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));


    try {
        const insertManyResult = await collection.insertMany(data);
        console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
      } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
      }
    console.log('Data uploaded successfully')
}

async function retrieve(){
    const dbName = "database1";
    const collectionName = "doctors1";
    const cursor = client.db("database1").collection("doctors1").find({});
    const results = await cursor.toArray();
    console.log(results);
    return results;
}

async function clearCollection(){
    await client.db('database1').collection('doctors1').deleteMany({});

    console.log("stuff deleted");
}
module.exports = {run,upload,retrieve,clearCollection};