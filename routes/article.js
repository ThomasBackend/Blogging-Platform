const express = require('express');
const {createArticle} = require('../controllers/article')
const auth = require('../middleware/auth')
const router = express.Router();

// router.use(auth);

router.post('/', createArticle)


module.exports = express;