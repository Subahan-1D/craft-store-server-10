const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// MIDDLEWARE

app.use(cors());
app.use(express.json());


// MongoDb User 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yqmtelq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const craftCollection = client.db('craftStoredb').collection('craft');



        app.get('/categories', async (req, res) => {
            const cursor = craftCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.put('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedCraft = req.body;
            const craft = {
                $set: {
                    image: updatedCraft.image,
                    subCategoryName: updatedCraft.subCategoryName,
                    price: updatedCraft.price,
                    customization: updatedCraft.customization,
                    stockStatus: updatedCraft.stockStatus,
                    item: updatedCraft.item,
                    description: updatedCraft.description,
                    rating: updatedCraft.rating,
                    processingTime: updatedCraft.processingTime
                }
            }
            const result = await craftCollection.updateOne(filter,craft,options);
            res.send(result);

        })


        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await craftCollection.findOne(query);
            res.send(result)
        })



        app.post('/categories', async (req, res) => {
            const newCraftStore = req.body;
            console.log(newCraftStore);
            const result = await craftCollection.insertOne(newCraftStore)
            res.send(result);
        })

        app.delete('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await craftCollection.deleteOne(query);
            res.send(result);
        })








        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);










app.get('/', (req, res) => {
    res.send('ART CRAFT STORE SERVER ');
});

app.listen(port, () => {
    console.log(`ART CRAFT STORE SERVER RUNNING : ${port}`);
})