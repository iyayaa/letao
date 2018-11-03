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
	      		cartData = data;
	      		setTimeout(function(){

	      			$('.mui-table-view').html(template('cart',data));
	      		
	      			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

	      		},1000);
	      	});
	      }
	    }
	  }
	});
	//编辑
	$('.mui-table-view').on('tap','.mui-icon-compose',function(){
		var btnArray = ['确认', '取消'];
		var id= $(this).parent().attr('data-id');
		var itemData = getItemById(id,cartData.data);
		mui.confirm(template('edit',itemData).replace(/\n/g,''), '编辑商品', btnArray, function(e){

			if (e.index == 0) {
				
				var size = $('.btn_size.now').html();
                var num = $('.p_number input').val();
                
				editCart(itemData.id,size,num);
			} else {
				
			}
		});
	});
	$('body').on('tap','.btn_size',function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
    $('body').on('tap','.p_number span',function () {
        var $input = $(this).siblings('input');
        var currNum = $input.val();
        /*字符串 转数字 */
        var maxNum = parseInt($input.attr('data-max'));
        if ($(this).hasClass('jian')) {
            if(currNum <= 1){
                return false;
            }
            currNum--;
        } else {
            /*不超库存*/
            if(currNum >= maxNum){
                /*消息框点击的时候会消失 正好和加号在一块  (击穿 tap,点击穿透)*/
                setTimeout(function () {
                    mui.toast('超出库存');
                },100);
                return false;
            }
            currNum++;
        }
        $input.val(currNum);
    });
    //删除
    $('.mui-table-view').on('tap','.mui-icon-trash',function(){
		var btnArray = ['确认', '取消'];
		$that = $(this);
		var id= $that.parent().attr('data-id');

		mui.confirm('真的要删除吗？', '删除商品', btnArray, function(){

			if (e.index == 0) {
				delCart(id,function(){
					$that.parent().parent().remove();
				});
			} else {
				
			}
		});
	});

})
var cartData=null;
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
var getItemById = function(id,arr){
	var obj=null;
	arr.forEach(function(item){
		if(item.id == id){
			obj = item;
			
		}
	});
	return obj;
};
var editCart = function(id,size,num){
	CT.loginAjax({
		url:'/cart/updateCart',
		type:'post',
		data:{
			id:id,
			num:num,
			size:size
		},
		dataType:'json',
		success:function(data){
			if(data.success ==true){
				getItemById(id,cartData.data).num=num;
				getItemById(id,cartData.data).size=size;
				$('.mui-table-view').html(template('cart',cartData));

			}
		}
	});
};

var delCart = function(id,callback){
	CT.loginAjax({
		url:'/cart/deleteCart',
		type:'get',
		data:{id:id},
		dataType:'json',
		success:function(data){
			// console.log(data);
			if(data.success == true){
				callback&&callback();
			}
		}
	});
};