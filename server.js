require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();

const PORT = process.env.PORT || 3001;


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Success');
    })
    .catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.listen(PORT, () => {
    console.log(`SERVER UP ON PORT ${PORT}`);
})