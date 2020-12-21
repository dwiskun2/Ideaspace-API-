require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session')

const handle = require('./controllers'); 
const routes = require('./routes/index');



// mongoose.Promise = global.Promise;
// // mongoose.connect('mongodb://localhost/carsproject');
// mongoose.connect(process.env.DB_CONNECTION || 'mongodb://localhost/carsproject', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB Connceted'))
// .catch(err => console.log(err));


mongoose.connect(process.env.db_URL, {
	useNewUrlParser: true,
	useFindAndModify:true,
	useUnifiedTopology:true,
	useCreateIndex:true
}).then(() => console.log("DB connected established"))
.catch(err => console.log("DB connection error : ", err));
const app = express();
const port = process.env.PORT;
//routes



//middlewares
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({secret:"asdsakjknkjnasd12", resave:false, saveUninitialized:true}))

// app.use('/uploads', express.static('uploads'))
//routes

app.use('/', routes.auth);
app.use('/products', routes.products);
app.use('/categories', routes.categories);
app.use('/events', routes.events);
app.use('/donations', routes.donations);
app.use('/transactions', routes.transactions);
app.use('/users', routes.users);
app.use('/banks', routes.banks);
app.use('/testimonies', routes.testimonies);
app.use('/banners', routes.banners);
app.use('/user', routes.userUpdateData);


//catch 404 Errors and forward them to error handler
app.use(handle.notFound);
//Error handlers function
app.use(handle.errors);

//Start the server

app.listen(port, console.log(`Server start on port ${port}`));