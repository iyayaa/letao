$(function () {
	mui('.mui-scroll-wrapper').scroll({
		indicators:false
	});
	// $('.ct_search a').on('tap',function(){
	// 	var key = $.trim($('.ct_search input').val());
	// 	if(key == '') {
	// 		mui.toast('请输入搜索内容');
	// 		return false;
	// 	}
	// 	 location.href = './searchList.html?key='+key;
	// });
	/*1.页面初始化的时候：关键字在输入框内显示*/
	var urlKey = getParamsByUrl().key;
	$('.ct_search input').val(urlKey||'');
	/*2.页面初始化的时候：根据关键字查询第一页数据4条*/
	getSearchData({
		'proName':urlKey,
		'page':1,
		'pageSize':4
	},function(data){
		$('.ct_product').html(template('productList',data));
		// console.log(data);

	});
	/*3.用户点击搜索的时候 根据新的关键字搜索商品 重置排序功能*/
	$('.ct_search a').on('tap',function(){
		var key = $.trim($('.ct_search input').val());
		if(key == '') {
			mui.toast('请输入搜索内容');
			return false;
		}
		getSearchData({
			'proName':key,
			'page':1,
			'pageSize':4
		},function(data){
			$('.ct_product').html(template('productList',data));
			// console.log(data);

		});
	});
});




function getParamsByUrl(){
	var search = location.search.substring(1);
	var params ={};
	if(search){
		var arr = search.split('&');
		arr.forEach(function(item){
			itemArr = item.split('=');
			params[itemArr[0]] = itemArr[1];
		});
	}
	return params;
}
function getSearchData(params,callback){
	$.ajax({
		url:'/product/queryProduct',
		type:'get',
		data:params,
		dataType:'json',
		success:function(data){
			callback && callback(data);
		}
	});
}