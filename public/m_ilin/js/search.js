$(function () {
	$('.ct_search a').on('tap',function(){
		var key = $.trim($('.ct_search input').val());
		if(key == '') {
			mui.toast('请输入搜索内容');
			return false;
		}
		 location.href = './searchList.html?key='+key;
	});
});