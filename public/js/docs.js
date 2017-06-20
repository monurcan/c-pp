$(function(){
	if(window.location.hash){
		$('article h4 a, article h3').removeClass("active");
		l = $('article h4 a[href="'+window.location.hash+'"]').addClass("active").offset().top;
		$(document).scrollTop(l - 82);
	}else {
		$('article h4 a, article h3').removeClass("active");
		$('article h3').addClass("active");
	}
	var l;
	$(window).on('hashchange',function(){
		if(window.location.hash){
			$('article h4 a, article h3').removeClass("active");
			l = $('article h4 a[href="'+window.location.hash+'"]').addClass("active").offset().top;
		}else {
			$('article h4 a, article h3').removeClass("active");
			$('article h3').addClass("active");
		}		
	});
	$(window).on('scroll', function(){
		if($(window).scrollTop() > 85){
			$(".left").css("position", "fixed");
		}else {
			$(".left").css("position", "static");
		}

		$('h4').each(function(){
            var h4 = $(this);
            var position = h4.position().top - $(window).scrollTop();
            
            if(position <= 0){
                window.location.hash = h4.children("a").attr("href").substr(1);
            }
        });
	});
	$('.left a[href="'+(window.location.pathname)+'"]').addClass('active').parent('ul').show();
	$('.left a[href="'+(window.location.pathname.substring(0, window.location.pathname.length-1))+'"]').addClass('active').next('ul').show().parent('ul').show();
});