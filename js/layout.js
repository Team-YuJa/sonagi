//윈도우 사이즈에 따라 변경을 할지 않할 지 체크한다.
let isAllowRequestList = false;
let sonamu_load_type = 'A';

function liberty_do_func_xss_encode(data) {
    data = data.replace(/'/g, '&#x27;');
    data = data.replace(/"/g, '&quot;');
    data = data.replace(/</g, '&lt;');
    data = data.replace(/</g, '&gt;');

    return data;
}

//매개 변수 parent는 ul태그여야 합니다
function ShowAjaxRecentList(parent) {
	function temp() {
        jQuery.ajax({
            url: "/api/recent_changes", // 호출 URL
            dataType:'json'
        }).done(function(res) {
            var html = "";
            for(var i = 0 ; i < res.length && i < 10 ; i++) {
                var item = res[i];

                html += '<li><a class="recent-item" href="/w/' + encodeURIComponent(item[1]) + '" title="' + liberty_do_func_xss_encode(item[1]) +'">';
                html += "[" + liberty_do_func_xss_encode(item[2].replace(/^([^ ]+) /, '')) + "] ";
                var text = item[1];
                if(text.length > 13) {
                    text = text.substr(0,13);
                    text +="...";
                }
                html += text;
                html += "</a></li>"
            }
            
            if(parent != null) {
                jQuery(parent).html(html);
            }
        });
	}
	temp();
}


/**
 * Vector-specific scripts
 */
var recentIntervalHandle = null;
jQuery( function ( jQuery ) {
	var width = jQuery(window).width();
	if(width > 1023) {
		isAllowRequestList = true;
		ShowAjaxRecentList(jQuery("#live-recent-list"));
	}
	else {
		isAllowRequestList = false;
	}

	//만약에 화면의 사이즈가 작아 최근 변경글이 안보일 시, 갱신을 하지 않는다.
	jQuery(window).resize(recentIntervalCheck);
});

var recentIntervalCheck = function() {
	var width = jQuery(window).width();
	if(width <= 1023) {
		if(recentIntervalHandle != null) {
			clearInterval(recentIntervalHandle);
			recentIntervalHandle = null;
		}
		isAllowRequestList = false;
	} else {
		if(recentIntervalHandle == null) {
			recentIntervalHandle = setInterval(function() {
				ShowAjaxRecentList(jQuery("#live-recent-list"));
			}, 60 * 1000);
		}
		isAllowRequestList = true;
	}
}

jQuery(document).ready(function(jQuery) {
	recentIntervalCheck();
});

/* 드롭다운 페이드인 */
jQuery('.dropdown').on('show.bs.dropdown', function(e) {
    jQuery(this).find('.dropdown-menu').first().stop(true, true).fadeToggle(200);
});

jQuery('.dropdown').on('hide.bs.dropdown', function(e) {
    jQuery(this).find('.dropdown-menu').first().stop(true, true).fadeToggle(200);
});

jQuery('.btn-group').on('show.bs.dropdown', function(e) {
    jQuery(this).find('.dropdown-menu').first().stop(true, true).fadeToggle(200);
});

jQuery('.btn-group').on('hide.bs.dropdown', function(e) {
    jQuery(this).find('.dropdown-menu').first().stop(true, true).fadeToggle(200);
});
/* 드롭다운 페이드인 End */