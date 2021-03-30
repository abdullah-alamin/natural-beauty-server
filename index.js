const express= require('express');
const cors= require('cors');
const app= express();

app.use(cors());
app.use(express.json());
//mongo connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alamin:1234@cluster0.4cfgh.mongodb.net/natural_beauties?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if(err) console.log('error: ', err);
  const beautyCollection = client.db("natural_beauties").collection("beauties");
  console.log('database connected');

  app.post('/addBeauty', (req, res)=> {
      const body= req.body
      beautyCollection.insertOne(body)
      .then(data=> res.send(data.ops))
      .catch(err=> 'error '+ err)
  })

  app.get('/allBeauty', (req, res)=> {
      beautyCollection.find({}).toArray((err, docs)=> res.send(docs))
  })
});


app.get('/', (req, res)=> {
    res.send('salam');
})

app.listen(3001);