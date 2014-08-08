$(document).ready(function() {
    var loadbutton = $('#journal-loadmore');
    var loadtext = loadbutton.text();
    var url = $('.journal-arrow.ja-forward').attr("href");
    $.ajaxSetup({  
        async : false  
    });
    $('#journal-arrows-cont').hide();
    HideIfNoMorePosts();
    function HideIfNoMorePosts() {
        if (url == undefined || url.length == 0) {
            loadbutton.remove();
			$('footer').show();
        } else {
            loadbutton.show();
			$('footer').hide();
        }
    }
    loadbutton.click(function() {
        moreposts();
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() >= ($(document).height() - ($(window).height()))) {
            if (loadbutton.closest('body').length > 0) moreposts();
        }
    });
    function moreposts() {
        loadbutton.empty().append('Loading...');
		var next_url = url;
		$.get(next_url, function(data,status){
			var articles = $(data).find('#journal-articles-block').children();
            $('<span></span>').appendTo('#journal-articles-block').hide().append(articles).fadeIn(500);
			url = $(data).find('.journal-arrow.ja-forward').attr("href");
            loadbutton.empty().append(loadtext);
			HideIfNoMorePosts();
		});
        HideIfNoMorePosts();
    }
});