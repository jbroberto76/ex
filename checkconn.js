const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb+srv://jbroberto:P%40sswd@cluster0.odukn.mongodb.net/`";
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    resultPing = await client.db("admin").command({ ping: 1 });
    resultHello = await client.db("admin").command({ hello: 1 });
    resultWhat = await client.db("admin").command({ whatsmyuri: 1 });
    console.log(resultWhat)
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir)
