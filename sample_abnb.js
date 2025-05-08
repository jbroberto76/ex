async function main() {
  
  const {MongoClient} = require('mongodb')
  require('dotenv').config()
  const uri = process.env['URI']
  const client = new MongoClient(uri);

  await client.connect();
  await findListings(client, 5);
  await client.close();
  
}
main().catch(console.error);

async function findListings(client, resultsLimit) {
  const cursor = client
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .find()
    .project()
    .limit(resultsLimit);

  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} listing(s):`);
    results.forEach((result, i) => {
      console.log();
      console.log(`${i + 1}. Name: ${result.name}`);
      console.log(`   Bedrooms: ${result.bedrooms}`);
      console.log(`   Bathrooms: ${result.bathrooms}`);
    });
  }
}