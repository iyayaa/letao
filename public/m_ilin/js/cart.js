$(function () {
	mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
	// 刷新
	$('.fa-refresh').on('tap',function(){
		mui('#refreshContainer').pullRefresh().pulldownLoading();
	});
	// 加载数据
    mui.init({
	  pullRefresh : {
	    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      auto: true,//可选,默认false.首次加载自动下拉刷新一次
	      callback :function(){
	      	getCartData(function(data){
	      		// console.log(data);
	      		setTimeout(function(){

	      			$('.mui-table-view').html(template('cart',data));
	      		
	      			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

	      		},1000);
	      	});
	      }
	    }
	  }
	});

})
var getCartData = function(callback){
	CT.loginAjax({
		url:'/cart/queryCartPaging',
		type:'get',
		data:{
			page:1,
			pageSize:100
		},
		dataType:'json',
		success:function(data){
			callback&&callback(data);
		}
	});
};