const  { Article }  = require('../models/article');

const createArticle = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, password, phone } = req.body;
    const newUser = await Article.create({ userId, firstName, lastName, email, password, phone });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createArticle
};