const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const storageRoutes = require('./routes/storageRoutes');

const {result,sortedLastIndexOf}=require('lodash');


//express app

const app = express();

//conectando o DB

//register view engine

app.set('view engine','ejs');

//middleware static files 

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//routes

