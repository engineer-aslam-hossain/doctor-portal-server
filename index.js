const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('doctors'));
app.use(fileUpload());

////////// connecting with mongo //////////////

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@doctorportalcluster-shard-00-00.i4xsw.mongodb.net:27017,doctorportalcluster-shard-00-01.i4xsw.mongodb.net:27017,doctorportalcluster-shard-00-02.i4xsw.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-wrok8c-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
  const AppointmentCollection = client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION);

  app.post('/bookAppointment', (req, res) => {
    const appointment = req.body;
    AppointmentCollection.insertOne(appointment).then(result => {
      res.send(result);
      console.log(result.insertedCount);
    });
  });

  app.get('/getRecenetAppointment', (req, res) => {
    AppointmentCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  const BlogsCollection = client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION2);

  app.post('/addBlogData', (req, res) => {
    const blogs = req.body;
    BlogsCollection.insertMany(blogs).then(result => {
      res.send(result);
      console.log(result.insertedCount);
    });
  });

  app.get('/getBlogsData', (req, res) => {
    BlogsCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  const appointmentsCollection = client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION3);

  app.post('/addAppointmentsData', (req, res) => {
    const appointments = req.body;
    appointmentsCollection.insertMany(appointments).then(result => {
      res.send(result);
      console.log(result.insertedCount);
    });
  });

  app.get('/getAppointmentsData', (req, res) => {
    appointmentsCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  const doctorsCollection = client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION4);

  app.post('/addDoctorsData', (req, res) => {
    const doctors = req.body;
    doctorsCollection.insertMany(doctors).then(result => {
      res.send(result);
      console.log(result.insertedCount);
    });
  });

  app.post('/addADoctor', (req, res) => {
    const file = req.files.file;
    const name = req.body.name;
    const phone = req.body.phone;
    const newImg = file.data;
    const encImg = newImg.toString('base64');
    console.log(file, name, phone, newImg);
    var image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, 'base64'),
    };

    doctorsCollection.insertOne({ name, phone, image }).then(result => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get('/getDoctorsData', (req, res) => {
    doctorsCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  const businessInfoCollection = client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION5);

  app.post('/addBusinessData', (req, res) => {
    const businessInfo = req.body;
    businessInfoCollection.insertMany(businessInfo).then(result => {
      res.send(result);
      console.log(result.insertedCount);
    });
  });

  app.get('/getBusinessData', (req, res) => {
    businessInfoCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  const reviewCollection = client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION6);

  app.post('/addReviews', (req, res) => {
    const reviews = req.body;
    reviewCollection.insertMany(reviews).then(result => {
      res.send(result);
      console.log(result.insertedCount);
    });
  });

  app.get('/getReviews', (req, res) => {
    reviewCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  const serviceCollection = client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION7);

  app.post('/addServices', (req, res) => {
    const services = req.body;
    serviceCollection.insertMany(services).then(result => {
      res.send(result);
      console.log(result.insertedCount);
    });
  });

  app.get('/getServices', (req, res) => {
    serviceCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('<h1>Hello from Server </h1>');
});

app.listen(process.env.PORT || 8080, () => console.log(`I am listening`));

////////////////////////////////
