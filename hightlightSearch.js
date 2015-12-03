/**
 * version：0.1.0_alpha
 * create by lutreer 
 * 2015-10-25
 * 任何使用请著名出处：https://github.com/Lutreer/hightlightSearch
 */
;(function($, window, document, undefined){
	//HightLight 构造函数
	var HightLight = function($ele, str, opt){
		this.$element = $ele;
		this.string = str;
		this.defaults = {
			'backgroundColor': 'transparent',
			'fontWeight': 'normal',
			'color': 'red',
			'showCount': false,
			'countDOM': '.countDOM',
			'mark': 'hightLightMark'
		}

		this.options = $.extend({}, this.defaults, opt);
	}

	//为 HightLight 添加方法
	HightLight.prototype = {
		textSearchLight: function() {
			loopSearch(this);
		}
	}
	
	function loopSearch(hightLight){
		var count=0;
		var obj = hightLight;
		var _this = this;
		//搜索计数
		_this.count = function() {
			if(obj.options.showCount) {
				$(obj.options.countDOM).text(count);
			}
		}
		//对前一次高亮处理的文字还原
		_this.clean = function() {
			$("span[mark='"+obj.options.mark+"']").each(function() {
				var text = document.createTextNode($(this).text());	
				$(this).replaceWith($(text));
			});
		}
		
		//对文字进行高亮处理
		_this.innerloop = function(obj) {
			if(obj.string.length > 0) {
				obj.$element.each(function(){
					var pattern = new RegExp(obj.string);
					var isMatch = pattern.test($(this).text());
					count+= $(this).text().split(obj.string).length - 1;
					if(isMatch){
						var replaceStr = "<span style='background-color:"+obj.options.backgroundColor
						+";font-weight:"+obj.options.fontWeight
						+";color:"+obj.options.color
						+";' mark='"+obj.options.mark+"'>"+obj.string+"</span>";
						var matchStr = new RegExp(obj.string, 'g');
						$(this).html($(this).html().replace(matchStr, replaceStr));
					}
				});
				_this.count();
			}else{
				_this.clean();
				$(obj.options.countDOM).text('');
			}
		}
		innerloop(obj);
		
	}
	/*//字符串正则表达式关键字转化
	$.regTrim = function(s){
		var imp = /[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g;
		var imp_c = {};
		imp_c["^"] = "\\^";
		imp_c["."] = "\\.";
		imp_c["\\"] = "\\\\";
		imp_c["|"] = "\\|";
		imp_c["("] = "\\(";
		imp_c[")"] = "\\)";
		imp_c["*"] = "\\*";
		imp_c["+"] = "\\+";
		imp_c["-"] = "\\-";
		imp_c["$"] = "\$";
		imp_c["["] = "\\[";
		imp_c["]"] = "\\]";
		imp_c["?"] = "\\?";
		s = s.replace(imp,function(o){
			return imp_c[o];					   
		});	
		return s;
	};*/
	
	$.fn.wordLight = function(string, options){

		//创建 HightLight 实例
		var hightLight = new HightLight(this, string, options);

		//调用hightLight的textSearchLight()方法
		return hightLight.textSearchLight();
	}
})(jQuery, window, document);