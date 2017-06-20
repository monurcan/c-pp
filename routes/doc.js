var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var docsSchema = new mongoose.Schema({
	title: String,
	content: String,
	parent: String,
	name: String
});

mongoose.model('docs', docsSchema);

var menu = "";

router.get('/', function(req, res){
	res.redirect('/doc/intro');
});

var content;
router.get('/:title', function(req, res){
	if(menu == ''){
		mongoose.model('docs').find({parent: '/intro'}, function(err, docs){
			menu += '<a href="/doc/intro"><h5>BAŞLARKEN</h5></a><ul><a href="/doc/intro"><li>Kısaca</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/intro/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
		mongoose.model('docs').find({parent: '/basics'}, function(err, docs){
			menu += '<a href="/doc/basics"><h5>TEMEL</h5></a><ul><a href="/doc/basics"><li>Dizin</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/basics/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
		mongoose.model('docs').find({parent: '/install'}, function(err, docs){
			menu += '<a href="/doc/install"><h5>ORTAM KURULUMU</h5></a><ul><a href="/doc/install"><li>Dizin</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/install/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
		mongoose.model('docs').find({parent: '/details'}, function(err, docs){
			menu += '<a href="/doc/details"><h5>DETAYLAR</h5></a><ul><a href="/doc/details"><li>Dizin</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/details/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
		mongoose.model('docs').find({parent: '/db'}, function(err, docs){
			menu += '<a href="/doc/db"><h5>VERİ TABANI</h5></a><ul><a href="/doc/db"><li>Dizin</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/db/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
	}
	content = "";
	mongoose.model('docs').findOne({name: req.params.title}, function(err, doc){
		if(doc){
			content += doc.content+'<br />';
			mongoose.model('docs').find({parent: '/'+req.params.title}, function(err, docs){
				for(i = 0; i < docs.length; i++){
					content += '<h4><a href="/doc/'+doc.name+'/'+docs[i].name+'">'+docs[i].title+'</a></h4><br />'+docs[i].content.substring(0, 255)+' [...]<br />';
				}
				res.render('index', { title: 'Dökümantasyon | Ç++', titlex: 'Dökümantasyon', style: 'docs', script: 'docs', ctitle: doc.title, content: content, menu: menu, partials: {content: 'docs'} });
			});
		}else {
			res.redirect('/doc/intro');
		}
	});
});

router.get('/:title/:docs', function(req, res){
	if(menu == ''){
		mongoose.model('docs').find({parent: '/intro'}, function(err, docs){
			menu += '<a href="/doc/intro"><h5>BAŞLARKEN</h5></a><ul><a href="/doc/intro"><li>Kısaca</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/intro/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
		mongoose.model('docs').find({parent: '/basics'}, function(err, docs){
			menu += '<a href="/doc/basics"><h5>TEMEL</h5></a><ul><a href="/doc/basics"><li>Dizin</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/basics/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
		mongoose.model('docs').find({parent: '/install'}, function(err, docs){
			menu += '<a href="/doc/install"><h5>ORTAM KURULUMU</h5></a><ul><a href="/doc/install"><li>Dizin</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/install/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
		mongoose.model('docs').find({parent: '/details'}, function(err, docs){
			menu += '<a href="/doc/details"><h5>DETAYLAR</h5></a><ul><a href="/doc/details"><li>Dizin</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/details/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
		mongoose.model('docs').find({parent: '/db'}, function(err, docs){
			menu += '<a href="/doc/db"><h5>VERİ TABANI</h5></a><ul><a href="/doc/db"><li>Dizin</li></a>';
			for(i=0; i<docs.length; i++){
				menu += '<a href="/doc/db/'+docs[i].name+'"><li>'+docs[i].title+'</li></a>';
			}
			menu += '</ul>';
		});
	}
	mongoose.model('docs').findOne({name: req.params.docs}, function(err, doc){
		if(doc){
			res.render('index', { title: 'Dökümantasyon | Ç++', titlex: 'Dökümantasyon', style: 'docs', script: 'docs', ctitle: doc.title, content: doc.content, menu: menu, partials: {content: 'docs'} });
		}else {
			res.redirect('/doc/intro');
		}
	});
});

module.exports = router;