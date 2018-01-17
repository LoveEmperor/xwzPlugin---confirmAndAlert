(function($) {
// xwzPlugin---confirm
	$.alerts = {
		alert: function(title, message, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},

		confirm: function(title, message, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},


		_show: function(title, msg, value, type, callback) {

			var _html = "";

			_html += '<div id="xwz_box"></div><div id="xwz_con"><span id="xwz_tit">' + title + '</span>';
			_html += '<div id="xwz_msg">' + msg + '</div><div id="xwz_btnbox">';
			if (type == "alert") {
				_html += '<input id="xwz_btn_ok1" type="button" value="确定" />';
			}
			if (type == "confirm") {
				_html += '<input id="xwz_btn_ok" type="button" value="确定" />';
				_html += '<input id="xwz_btn_no" type="button" value="取消" />';
			}
			_html += '</div></div>';

			//必须先将_html添加到body，再设置Css样式
			$("body").append(_html); GenerateCss();

			switch( type ) {
				case 'alert':

					$("#xwz_btn_ok1").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#xwz_btn_ok1").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#xwz_btn_ok").trigger('click');
					});
					break;
				case 'confirm':

					$("#xwz_btn_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#xwz_btn_no").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#xwz_btn_no").focus();
					$("#xwz_btn_ok, #xwz_btn_no").keypress( function(e) {
						if( e.keyCode == 13 ) $("#xwz_btn_ok").trigger('click');
						if( e.keyCode == 27 ) $("#xwz_btn_no").trigger('click');
					});
					break;


			}
		},
		_hide: function() {
			$("#xwz_box,#xwz_con").remove();
		}
	}
	// Shortuct functions
	xwzalert = function(title, message, callback) {
		$.alerts.alert(title, message, callback);
	}

	xwzconfirm = function(title, message, callback) {
		$.alerts.confirm(title, message, callback);
	};


	//生成Css
	var GenerateCss = function () {

		$("#xwz_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
			filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
		});

		$("#xwz_con").css({ zIndex: '999999', width: '55%', position: 'fixed',
			backgroundColor: 'White'
		});

		$("#xwz_tit").css({ display: 'block', fontSize: '14px', color: 'white', padding: '10px 15px',
			backgroundColor: 'rgb(56,126,245)',
			fontWeight: 'bold'
		//	borderBottom: '3px solid #009BFE',
		});

		$("#xwz_msg").css({ padding: '20px', lineHeight: '20px',
			 fontSize: '13px'
		//	borderBottom: '1px dashed #DDD',
		});

		$("#xwz_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '9px',
			border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',
			lineHeight: '16px', cursor: 'pointer',  fontFamily: '微软雅黑'
		});

		$("#xwz_btnbox").css({  textAlign: 'center' });
		$("#xwz_btn_ok1").css({width: '100%', height: '35px', color: 'white', border: 'none',backgroundColor: "rgba(56,126,245,0.9)" });
		$("#xwz_btn_ok,#xwz_btn_no").css({ width: '50%', height: '30px', color: 'white', border: 'none' });
		$("#xwz_btn_ok").css({ backgroundColor: "rgba(56,126,245,0.9)" });
		$("#xwz_btn_no").css({ backgroundColor: "rgba(50,205,94,0.9)"});
		// true #387EF5
		// false rgba(50,205,94,0.79)

		//右上角关闭按钮hover样式
		$("#xwz_ico").hover(function () {
			$(this).css({ backgroundColor: 'Red', color: 'White' });
		}, function () {
			$(this).css({ backgroundColor: '#DDD', color: 'black' });
		});

		var _widht = document.documentElement.clientWidth; //屏幕宽
		var _height = document.documentElement.clientHeight; //屏幕高

		var boxWidth = $("#xwz_con").width();
		var boxHeight = $("#xwz_con").height();

		//让提示框居中
		$("#xwz_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
	}


})(jQuery);