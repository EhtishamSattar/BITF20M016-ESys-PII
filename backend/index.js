const connectToMongoose=require('./db')
const express = require('express')
const Admins = require('./models/Admins');
const logActivity=require('./middleware/logActivity')

//! browser ko backend sy direct access nhi kr saktay... usky liye hmy express ka cors 
const app = express()
//! pakage install krna pry gha
var cors = require('cors')
 
app.use(cors())
connectToMongoose();
const port=5000;

//! aesay bhi raita phelaya ja sakta tha but aek acha folder structure bnaye ghy ....
//! routes bnaye ghy or unko use kry ghy 

app.use(express.json());
app.use(logActivity)

app.get('/', (req, res) => {
  res.send(' Assalam u Alaikum ~ Ehtisham');
})

app.use('/api/admin',require('./routes/login'));
app.use('/api/student',require('./routes/students'));
app.use('/api/data-usage',require('./routes/usagedata'))

app.listen(port, () => {
  console.log(`Student Interest System listening on port http://localhost:${port}`)
})