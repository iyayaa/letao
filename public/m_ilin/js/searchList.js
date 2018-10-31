$(function () {
	mui('.mui-scroll-wrapper').scroll({
		indicators:false
	});
	/*1.页面初始化的时候：关键字在输入框内显示*/
	var urlKey = CT.getParamsByUrl().key;
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
		// var key = $.trim($('.ct_search input').val());
		// if(key == '') {
		// 	mui.toast('请输入搜索内容');
		// 	return false;
		// }
		getSearchData({
			'proName': checkKey(),
			'page':1,
			'pageSize':4
		},function(data){
			$('.ct_order a').removeClass('now').find('span').removeClass('now fa-angle-up').addClass('fa-angle-down');
			$('.ct_product').html(template('productList',data));
			// console.log(data);

		});
		mui('#refreshContainer').pullRefresh().refresh(true);
	});

	/*4.用户点击排序的时候  根据排序的选项去进行排序（默认的时候是 降序  再次点击的时候 升序）*/
	$('.ct_order a').on('tap',function(){
		if($(this).hasClass('now')){
			$(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');	
		}
		$(this).addClass('now').siblings().removeClass('now');

		$that = $(this);
		getSearchDataByOrder($that,1);
		mui('#refreshContainer').pullRefresh().refresh(true);
		// var params={
		// 	'proName':checkKey(),
		// 	'page':1,
		// 	'pageSize':4,
		// };
		// params[$(this).attr('data-order')] = $(this).find('span').hasClass('fa-angle-down')?'2':'1';
		// getSearchData(params,function(data){
		// 	$('.ct_product').html(template('productList',data));
		// });

	});


	/*5.用户下拉的时候  根据当前条件刷新 上拉加载重置  排序功能也重置 */
	mui.init({
	  pullRefresh : {
	    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      // auto: true,//可选,默认false.首次加载自动下拉刷新一次s
	      callback :function(){
	      	getSearchData({
				'proName': checkKey(),
				'page':1,
				'pageSize':4
			},function(data){
				$('.ct_order a').removeClass('now').find('span').removeClass('now fa-angle-up').addClass('fa-angle-down');
				$('.ct_product').html(template('productList',data));

				mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
				mui('#refreshContainer').pullRefresh().refresh(true);

			});
	      }
	    },
	    up : {
	      // auto:true,//可选,默认false.自动上拉加载一次
	      callback :function(){
	      	_this = this;
	      	setTimeout(function(){
		      	var $that = $('.ct_order a.now');
		      	loadFlag = true;
		      	_this.endPullupToRefresh(noData);
		      	getSearchDataByOrder($that,parseInt(page+1),loadFlag);
		      	_this.endPullupToRefresh(noData);
				loadFlag = false;

	      	},1000);
	      }
	    }
	  }
	});

});

function checkKey(){

	var key = $.trim($('.ct_search input').val());
	if(key == '') {
		mui.toast('请输入搜索内容');
		return false;
	}
	return key;
}


// function getParamsByUrl(){
// 	var search = location.search.substring(1);
// 	var params ={};
// 	if(search){
// 		var arr = search.split('&');
// 		arr.forEach(function(item){
// 			itemArr = item.split('=');
// 			params[itemArr[0]] = itemArr[1];
// 		});
// 	}
// 	return params;
// }
var page;
var loadFlag = false;
var noData = false;
function getSearchData(params,callback){
	$.ajax({
		url:'/product/queryProduct',
		type:'get',
		data:params,
		dataType:'json',
		success:function(data){
			page = data.page;
			// console.log(data);
			callback && callback(data);
		}
	});
}
function getSearchDataByOrder(tabItem,page,loadFlag){
	var params={
		'proName':checkKey(),
		'page':page,
		'pageSize':4,
	};
	params[tabItem.attr('data-order')] = tabItem.find('span').hasClass('fa-angle-down')?'2':'1';
	getSearchData(params,function(data){
		if(loadFlag){
			
			if(data.data.length == 0){
				noData = true;
			}
			$('.ct_product').append(template('productList',data));
		}else{
			$('.ct_product').html(template('productList',data));
		}
		
	});
}