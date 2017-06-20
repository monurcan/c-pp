$(function(){
	var tg = 0;
	$("html").on('click', function(e){
		if(!$(e.target).is('header .menu li') && !$(e.target).is('header .menu li *')){
			$('header .menu li.drop .drop').hide();
		}else{
			$('header .menu li.drop .drop').not($(e.target).children('.drop').toggle()).hide();
		}
	});

	$(".container > .rn").click(function(){
		var input = $(this).prev("pre").text(),
			output = "",
			dq_t = 0,
			dq = "";
		for(i = 0; i < input.length; i++){
			if(dq_t == 0){
				if(input[i] == '"'){
					dq += input[i];
					dq_t = 1;
				}else {
					if(dq != ""){
						if((input[i-dq.length-1] == '=' && input[i-dq.length] == '"') || (input[i-dq.length-2] == '=' && input[i-dq.length-1] == ' ' && input[i-dq.length] == '"') || (input[i-dq.length-2] == ' ' && input[i-dq.length-1] == '=' && input[i-dq.length] == '"') || (input[i-dq.length-3] == ' ' && input[i-dq.length-2] == '=' && input[i-dq.length-1] == ' ' && input[i-dq.length] == '"')){
							output += dq + ";";
							dq = "";
						}else if(input[i] == ";"){
							output += "(" + dq + ");";
							dq = "";
						}else if(input[i] == "+"){
							dq += "+";
						}else if(input[i-1] == '"' && input[i] == ")"){
							output += dq + ")";
							dq = "";
						}else {
							output += input[i];
						}
					}else {
						output += input[i];
					}
				}
			}else{
				if(input[i] == '"'){
					dq += input[i];
					dq_t = 0;
				}else {
					dq += input[i];
				}
			}
		}

		document.write("<b>Girdi = </b>" + input + "<br />");

		var lex = "";
		for(i = 0; i < output.length; i++){
			if(output[i] == "y" && output[i+1] == "a" && output[i+2] == "z"){
				lex += "document.write";
				i += 2;
			}else if(output[i] == "b" && output[i+1] == "a" && output[i+2] == "s"){
				lex += "alert";
				i += 2;
			}else if(output[i] == "e" && output[i+1] == "ğ" && output[i+2] == "e" && output[i+3] == "r"){
				lex += "if";
				i += 3;
			}else if(output[i] == "f" && output[i+1] == "a" && output[i+2] == "k" && output[i+3] == "a" && output[i+4] == "t"){
				lex += "else if";
				i += 4;
			}else if(output[i] == "d" && output[i+1] == "e" && output[i+2] == "ğ" && output[i+3] == "i" && output[i+4] == "l" && output[i+5] == "s" && output[i+6] == "e"){
				lex += "else";
				i += 6;
			}else if(output[i] == "b" && output[i+1] == "e" && output[i+2] == "l" && output[i+3] == "g" && output[i+4] == "e"){
				lex += "document";
				i += 4;
			}else if(output.substring(i, i+19) == "IdyeGöreElemanaulaş"){
				lex += "getElementById";
				i += 18;
			}else if(output.substring(i, i+6) == "içHTML"){
				lex += "innerHTML";
				i += 5;
			}else if(output.substring(i, i+8) == "değişken"){
				lex += "var";
				i += 7;
			}else {
				lex += output[i];
			}
		}

		lex = lex.replace(/#([0-9a-zA-Z]+)/i, '" + $1 + "');

		document.write("<b>JavaScript Dönüşümü = </b>" + lex + "<hr /><b>Çıktı = </b>");
		try {
			eval(lex);
		}catch(e){
			document.write("<br /><b>Hata: " + e.message + "</b><br />");
		}
	});
	
	$(".fm.comp .container pre:first").show().next(".rn").show();
	$(".fm.compi .container img:first").show();

	$(".fm.comp .container > .comp li").click(function(){
		$(".fm.comp .container > .comp li").removeClass("active");
		$(this).addClass("active");
		$(".fm.comp .container pre").hide().next(".rn").hide();
		$(".fm.comp .container pre:eq("+$(this).index()+")").show().next(".rn").show();
	});

	$(".fm.compi .container > .compi li").click(function(){
		$(".fm.compi .container > .compi li").removeClass("active");
		$(this).addClass("active");
		$(".fm.compi .container img").hide().next(".rn").hide();
		$(".fm.compi .container img:eq("+$(this).index()+")").show().next(".rn").show();
	});
});