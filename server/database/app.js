const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors')
const app = express()



app.use(cors())
app.use(require('body-parser').urlencoded({ extended: false }));


const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
const hosts_data = JSON.parse(fs.readFileSync("hosts.json", 'utf8'));


mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
mongoose.connect("mongodb+srv://inboxayushpandey:inboxayushpandey2314@atithidev.prajrvm.mongodb.net/?retryWrites=true&w=majority&appName=atithidev");


const Reviews = require('./review');
const Hosts = require('./host');

try {
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviews_data['reviews']);
  });
  Hosts.deleteMany({}).then(() => {
    Hosts.insertMany(hosts_data['hosts']);
  });

} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' });
}


//Express route to home
app.get('/', async (req, res) => {
  res.send("Welcome to Mongoose API Its and running man cheers....'")
});

//Express route to fetch all reviews by particular host id
app.get('/fetchReviews/host/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ host: req.params.id });
    res.json(documents);
  }
  catch (error) {
    res.status(500).json({ error: 'Error fetching document' });
  }
});

//Express route to fetch all hosts

app.get('/fetchHosts', async (req, res) => {
  try {
    const hosts = await Hosts.find();
    res.json(hosts);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to retrieve dealers ' });
  }
});

//Express route to fetch hosts from particular state
app.get('/fetchHosts/:state', async (req, res) => {
  try {
    const hosts = await Hosts.find({ state: req.params.state })
    res.json(hosts);
  }
  catch (error) {
    res.status(500).json({ error: 'Unable to fetch dealers !' })
  }
});

//Express route to fetch host by id 
app.get('/fetchHost/:id', async (req, res) => {
  try {
    const host = await Hosts.find({id:req.params.id});
    if (!host) {
       return res.status(404).json({error:'host not found!'});
    }
    res.json(host);
  }
  catch (error) {
    res.status(500).json({ error: 'Unable to fetch host by id!' })
  }
});



//Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  data = JSON.parse(req.body);
  const documents = await Reviews.find().sort( { id: -1 } )
  let new_id = documents[0]['id']+1

  const review = new Reviews({

    "id": new_id,
    "name": data['name'],
    "host": data['host'],
    "review": data['review'],
    "visit": true,
    "visit_date": data['visit_date'],
    "room": data['room'],
    "amenities": data['amenities']
    
	});

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
		console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});