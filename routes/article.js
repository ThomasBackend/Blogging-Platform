const express = require('express');
const {createArticle, getArticlesByPublishingDate, getArticlesByTags, getArticleById, deleteAnArticle, 
    updateArticleTitle, updateArticleBody, updateArticleAuthor,addTagsToArticle,removeTagsFromArticle} = require('../controllers/article')

const router = express.Router();


router.patch('/update/remove-tags/:id', removeTagsFromArticle);
router.patch('/update/add-tags/:id', addTagsToArticle);
router.patch('/update/author/:id', updateArticleAuthor);
router.patch('/update/body/:id', updateArticleBody);
router.patch('/update/title/:id', updateArticleTitle);
router.get('/fetch/date', getArticlesByPublishingDate);
router.post('/fetch/tags', getArticlesByTags);
router.get('/fetch/:id', getArticleById);
router.delete('/delete/:id', deleteAnArticle);
router.post('/create', createArticle);



module.exports = router;