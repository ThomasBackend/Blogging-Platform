const   Article   = require('../models/article');
const { ObjectId } = require('mongodb')

const createArticle = async (req, res) => {
  try {
    const { title, body, author, tags } = req.body;

    if(!title){
      return res.status(422).json({error :"Title is required"})
    };

    if(!body){
      return res.status(422).json({error : "Body is required"})
    };

    if(!author){
      return res.status(422).json({error : "Author is required"})
    };

    if(!tags){
      return res.status(422).json({error : "Tags is required"})
    };

    if(!Array.isArray(tags)){
      return res.status(400).json({error : "Tags must be in an array"})
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

    if(!articles){
      return res.status(404).json({error : "There are no articles"})
    }

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
      return res.status(400).send("Tags must be in an array")
    };

    const articles = await Article.find({tags :{
      $all : tags
    }});

    if(!articles){
      return res.status(404).json({error : "There are no articles with the required tags"})
    }

    return res.status(200).json({result : articles});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


const getArticleById = async (req,res) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id).exec();

    if(!article){
      return res.status(404).json({error: "No article exists with this Id"});
    }

    return res.status(200).json({article})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const deleteAnArticle = async (req,res) => {
  try {
    const {id} = req.params;

    const checkExistence = await Article.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing article matches this ID"});
    }

    const deleteArticle = await Article.findByIdAndDelete(id).exec();

    return res.status(200).json({deleteArticle})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateArticleTitle = async (req,res) => {
  try {
    const {id} = req.params;
    const {title} = req.body;

    if(!title){
      return res.status(422).json({error : "A new article title is required"});
    }

    const checkExistence = await Article.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing article matches this ID"});
    }

    const updateArticle = await Article.findByIdAndUpdate(id, {title : title}).exec();

    return res.status(200).json({updateArticle})

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateArticleBody = async (req,res) => {
  try {
    const {id} = req.params;
    const {body} = req.body;

    if(!body){
      return res.status(422).json({error : "A new article body is required"});
    }

    const checkExistence = await Article.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing article matches this ID"});
    }

    const updateArticle = await Article.findByIdAndUpdate(id, {body : body}).exec();

    return res.status(200).json({updateArticle});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const updateArticleAuthor = async (req,res) => {
  try {
    const {id} = req.params;
    const {author} = req.body;

    if(!author){
      return res.status(422).json({error : "A new article author is required"});
    }

    const checkExistence = await Article.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing article matches this ID"});
    }

    const updateArticle = await Article.findByIdAndUpdate(id, {author : author}).exec();

    return res.status(200).json({updateArticle});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const addTagsToArticle = async (req,res) => {
  try {
    const {id} = req.params;
    const {tags} = req.body;

    if(!tags){
      return res.status(422).send("Tags is required");
    };

    if(!Array.isArray(tags)){
      return res.status(400).send("Tags must be an array");
    };

    const checkExistence = await Article.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing article matches this ID"})
    }

    const updateTags = await Article.findByIdAndUpdate(id,{$push : {tags : {$each : tags}}}).exec();

    return res.status(200).json({updateTags})

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const removeTagsFromArticle = async (req,res) => {
  try {
    const {id} = req.params;
    const {tags} = req.body;

    if(!tags){
      return res.status(422).send("Tags is required");
    };

    if(!Array.isArray(tags)){
      return res.status(400).send("Tags must be an array");
    };

    const checkExistence = await Article.findById(id).exec();

    if(!checkExistence){
      return res.status(404).json({error : "No existing article matches this ID"});
    }

    const checkTags = await Article.find({__id : ObjectId(id) ,tags :{
      $all : tags
    }});

    if(!checkTags){
    return res.status(404).json({error : "The article does not include one or more of the requested tags"});
    }

    const updateTags = await Article.findByIdAndUpdate(id,{$pull : {tags : {$each : tags}}}).exec();

    return res.status(200).json({updateTags})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createArticle
};