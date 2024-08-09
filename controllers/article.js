const { ValidationError } = require('sequelize');
const   Article   = require('../models/article');

const createArticle = async (req, res) => {
  try {
    const { title, body, author, tags } = req.body;

    if(!title){
      return res.status(422).send("Title is required")
    };

    if(!body){
      return res.status(422).send("Body is required")
    };

    if(!author){
      return res.status(422).send("Author is required")
    };

    if(!tags){
      return res.status(422).send("Tags is required")
    };

    if(!Array.isArray(tags)){
      return res.status(400).send("Tags must be an array")
    }

    const newArticle = await Article.create({ 
      title : title,
      body : body,
      author : author,
      tags : tags
    });

    res.status(201).json(newArticle);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getArticlesByPublishingDate = async (req,res) =>{
  try {
    
    const articles = await Article.find().sort({createdAt : 1});

    return res.status(200).json({result : articles})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const getArticlesByTags = async (req,res) =>{
  try {
     const {tags} = req.body;

     if(!tags){
      return res.status(422).send("Tags is required")
    };

    if(!Array.isArray(tags)){
      return res.status(400).send("Tags must be an array")
    };

    const articles = await Article.find({genres:{
      $all : tags
    }});

    return res.status(200).json({result : articles});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


const getArticleById = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const deleteAnArticle = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateArticleTitle = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateArticleBody = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateArticleAuthor = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const addTagsToArticle = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const removeTagsFromArticle = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createArticle
};