const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/User')
const movie = require('../models/Movie')

