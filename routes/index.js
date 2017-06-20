var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ç++ | Türkçe Programlama Dili', style: 'homepage', partials: {content: 'homepage'} });
});

module.exports = router;
