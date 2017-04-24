var js_i = 0;
function changeTranslation()
{
	document.getElementById("mainCCwarp").innerHTML = "";

	var videourl = document.getElementById("select-translate").value;

	if(videourl.substr(0, 6) == "mailru")
	{
		document.getElementById("mainCCwarp").innerHTML = "<iframe id=\"player-mailru\" src=\"" + videourl.substr(7) + "\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
	}
	else
	{
		js_i++;
		document.getElementById("mainCCwarp").innerHTML = "<video id=\"js_video" + js_i + "\" class=\"video-js  vjs-polyzor-skin\" controls preload=\"auto\" autoplay data-setup=\"\"> <source src=\"" + videourl + "\" type='video/mp4' />         <p class=\"vjs-no-js\">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href=\"http://videojs.com/html5-video-support/\" target=\"_blank\">supports HTML5 video</a></p></video>";
		videojs("js_video" + js_i, {}, function(){});
	}

}

var playerAndCommentResize = function()
{
	if($(window).width() > 1600)
	{
		//$("#player-mailru").width(1300);
		$("#vk_comments").width(1200);
		$("#vk_comments > iframe").width(1200);

		$("#vk_groups").width(1200);
		$("#vk_groups > iframe").width(1200);
		//$("#player-mailru").height(1300 * 9 / 16);
	}
	else if($(window).width() > 1100)
	{
		//$("#player-mailru").width($(window).width() - 400);
		//$("#player-mailru").height(($(window).width() - 400) * 9 / 16);

		$("#vk_comments").width($(window).width() - 400);
		$("#vk_comments > iframe").width($(window).width() - 400);

		$("#vk_groups").width($(window).width() - 400);
		$("#vk_groups > iframe").width($(window).width() - 400);
	}
	else if($(window).width() < 900)
	{
		//$("#player-mailru").width($(window).width());
		//$("#player-mailru").height($(window).width() * 9 / 16);
		$("#vk_comments").width($(window).width());
		$("#vk_comments > iframe").width($(window).width());

		$("#vk_groups").width($(window).width());
		$("#vk_groups > iframe").width($(window).width());
	}
}

var menuHidden = true;

var showmenu = function()
{
	$(".zz-bg").fadeToggle(200);
	if(menuHidden) {
		$(".sidebar").animate({
			right: 0
		});
		$("body").css({overflow: "hidden"});
		menuHidden = false;
	}
	else 
	{
		$(".sidebar").animate({
			right: -350
		});
		$("body").css({overflow: "visible"});
		menuHidden = true;	
	}
}

$(document).ready(function(){
	$(".zz-bg").click(showmenu);
	$(".scrollbar-macosx").scrollbar();
	/*$('.list-group').animate({
		scrollTop: $("#current").offset().top
	}, 200);*/
	if($('#player'))
	{
		$('#player').dblclick(function(){
			if(this.webkitDisplayingFullscreen) this.webkitExitFullscreen();
			else this.webkitEnterFullscreen();
		});
		$(document).keypress(function(e){
			console.log(e);
			if((e || window.event).keyCode === 32){
				$("#player").get(0).paused ? $("#player").get(0).play() : $("#player").get(0).pause();
			}
			return false;
		});
	}



	/*$('#player').click(function(){
		if(this.paused) this.play();
		else this.pause();
	});*/

	$("#seasonpicker").selectpicker();
	$('#select-translate').selectpicker();
	
	var vk_width;
	if($(window).width() > 1500) vk_width = 1200;
	else if($(window).width() > 1100) vk_width = $(window).width() - 400;
	else if($(window).width() < 900) vk_width = $(window).width();
	else vk_width = 700;
		
	if(document.getElementById("vk_comments"))
	{
		VK.init({apiId: 5336349, onlyWidgets: true});
		console.log(vk_width);
		VK.Widgets.Comments("vk_comments", {limit: 10, width: vk_width, attach: "*"});
	}
	if(document.getElementById("vk_groups"))
	{	
		VK.Widgets.Group("vk_groups", {mode: 0, width: vk_width, height: vk_width * 0.5, color1: 'FFFFFF', color2: '525252', color3: 'C50000'}, 71899623);
	}
});




$(window).resize(playerAndCommentResize);