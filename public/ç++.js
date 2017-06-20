window.onload = function(){
	// css selector jquery gibi
	var input = '',
		output = "",
		dq_t = 0,
		dq = "";

	var elements = document.getElementsByTagName('cpp');
	for(i = 0; i < elements.length; i++){
		input += elements[i].innerHTML;
	}
	for(index = elements.length - 1; index >= 0; index--) {
	    elements[index].parentNode.removeChild(elements[index]);
	}
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

	document.write("<b>girdi = </b>" + input + "<br /><hr />");
	document.write("<b>tr = </b>" + output + "<br /><hr />");
	
	//türkçe fonksiyon tanımlayınca tr_fnctn a da eklet aynı adla (girdi)fonksiyon_ismi şeklinde de kullan
	var lex = "",
		tr_fnctn = [
			["yaz", "document.write"],
			["bas", "alert"],
			["eğer", "if"],
			["fakat", "else if"],
			["değilse", "else"],
			["IdyeGöreElemanaulaş", "getElementById"],
			["içHTML", "innerHTML"],
			["değişken", "var"],
			["konsol", "console"],
			["girdi", "log"],
			["kır", "break"],
			["devam", "continue"],
			["yap", "do"],
			["iken", "while"],
			["belge", "document"]
		],
		tr_f = 0;
	for(i = 0; i < output.length; i++){
		for(xx = 0; xx < tr_fnctn.length; xx++){
			if(output.substring(i, i+tr_fnctn[xx][0].length) == tr_fnctn[xx][0]){
				lex += tr_fnctn[xx][1];
				i += tr_fnctn[xx][0].length-1;
				tr_f = 1;
				break;
			}
		}
		if(tr_f != 1){
			lex += output[i];
		}
		tr_f = 0;
	}

	lex = lex.replace(/#([0-9a-zA-Z]+)/i, '" + $1 + "');
	lex = lex.replace(/\((.+)\)için/i, 'for($1)');

	//document.write("<b>fin = </b>" + lex + "<br /><hr /><b>çıktı = </b>");
	try {
		eval(lex);
	}catch(e){
		document.write("<br /><b>Hata: " + e.message + "</b><br />");
	}
}