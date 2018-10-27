$(function() {

	//1.一级分类默认渲染 第一个一级分类对应的二级分类
	getFirstCategoryData(function(data){
		$('.cate_left ul').html(template('firstTemplate',data));
	});
	getSecondCategoryData({id:'1'},function(data){
		$('.cate_right ul').html(template('secondTemplate',data));
	});

	// 点击一级分类获取对应二级分类
	$('.cate_left ul').on('click','a',function(){
		// console.log($(this).attr('data-id'));
		if($(this).parent().hasClass('now'))
			return false;
		$('.cate_left li').removeClass('now');
		$(this).parent().addClass('now');
		getSecondCategoryData({id:$(this).attr('data-id')},function(data){
			// console.log(data);
			$('.cate_right ul').html(template('secondTemplate',data));
		});
	});

	


});

// 获取一级分类
function getFirstCategoryData(callback) {
	$.ajax({
		url:"/category/queryTopCategory",
		type:'get',
		data:'',
		dataType:'json',
		success:function(data){
			// console.log(data);
			callback&&callback(data);
		}
	});
}
//获取二级分类的数据
function getSecondCategoryData(params,callback){
	$.ajax({
		url:'/category/querySecondCategory',
		type:'get',
		data:params,
		dataType:'json',
		success:function(data){
			// console.log(data);
			callback && callback(data);
		}

	});
}