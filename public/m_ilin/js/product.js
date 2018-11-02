$(function(){
	/*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    // var num;
    var max,num;
    var id=CT.getParamsByUrl().id;
    getProductData(id,function(data){
    	$('.mui-scroll').html(template('detail',data));
    	// 初始化轮播
    	mui('.mui-slider').slider({
		  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
		});
		//商品尺码
		$('.p_size span').on('tap',function(){
			$(this).addClass('now').siblings().removeClass('now');
		});
		// 商品数量
		
		$('.p_number span').on('tap',function(){
			var $input =$(this).siblings('input').eq(0);
			max = parseInt($input.attr('data-max'));
			num = $input.val();
			if ($(this).hasClass('jian')) {
				if (num == 1) {
					return false;
				}else{
					num--;
					$input.val(num);
				}
			}else if($(this).hasClass('jia')){
				if (num >= max) {
						setTimeout(function(){
							mui.toast('超出库存');
							return false;
						},200);
					}else{
						num++;
						$input.val(num);
				}
			}
		});
		// 加入购物车
		$('.btn_addCart').on('tap',function(){
			num = $('.p_number input').val();
			if($('.p_size span.now').length == 0){
				mui.toast('请选择商品尺码');
				return false;
			}else{
				CT.loginAjax({
					"url":'/cart/addCart',
					"type":'post',
					"data":{
						'productId':id,
						'num':num,
						'size':$('.p_size span.now').html()
					},
					"dataType":'json',
					"success":function(data){
						if(data.success == true){
	                        mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
	                            if (e.index == 0) {
	                                location.href = '/m_ilin/user/cart.html';
	                            } else {
	                                //TODO
	                            }
	                        })
	                    }
					}
					
				});
			}
		});

    });
});

function getProductData(id,callback){
	$.ajax({
		url:'/product/queryProductDetail',
		type:'get',
		data:{'id':id},
		dataType:'json',
		success:function(data){
			callback&&callback(data);
		}

	});
}