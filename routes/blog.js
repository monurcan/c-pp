var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
	title: String,
	content: String,
	date: Date
});

mongoose.model('posts', blogSchema);

router.get('/', function(req, res){
	mongoose.model('posts').find({}).sort('-date').exec(function(err, posts){
		res.render('index', { title: 'Blog | Ç++', style: 'blog', posts: posts, partials: {content: 'blog'} });
	});
});

router.get('/:id', function(req, res){
	mongoose.model('posts').findOne({_id: req.params.id}, function(err, posts){
		res.render('index', { title: 'Blog | '+posts.title, style: 'blog', posts: posts, fs: 1, partials: {content: 'blog'} });
	});
});

module.exports = router;