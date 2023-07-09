const express = require('express');

const dotenv = require('dotenv');
const mongoose = require("mongoose");

var cors = require('cors');

const app = express();
app.use(cors({
	origin: '*'
  }));

const productRouter = require('./routes/products');
const port = 3000;

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Database Connected")).catch((err)=>console.log(err))

app.use(express.json({limit: '10mb'} ));
app.use(express.urlencoded({limit: '10mb', extended: true} ));

app.use('/api/products', productRouter)
app.listen(process.env.PORT || port, () => console.log(`KPG Kitchen listening on port ${process.env.PORT}!`))