$(function() {
	
	

	getCateSecondData(1,size,function(data){
			totalPage= Math.ceil(data.total/data.size);
		$('tbody').html(template('list',data));
		initPgeinator();
	});

	
});
var totalPage=0;
var size=1;
var initPgeinator = function(){
	$('#pageLimit').bootstrapPaginator({
	    currentPage: 1,
	    totalPages: totalPage,
	    size:"normal",
	    bootstrapMajorVersion: 3,
	    alignment:"right",
	    numberOfPages:5,
	    itemTexts: function (type, page, current) {
	        switch (type) {
	        case "first": return "首页";
	        case "prev": return "上一页";
	        case "next": return "下一页";
	        case "last": return "末页";
	        case "page": return page;
	        }//默认显示的是第一页。
	    },
        onPageClicked: function (event, originalEvent, type, page){//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
        	getCateSecondData(page,size,function(data){

				$('tbody').html(template('list',data));
			});
            // $.ajax({
            //     url:'/task_list_page/',
            //     type:'POST',
            //     data:{'page':page,'count':12},
            //     dataType:'JSON',
            //     success:function (callback) {
            //             $('tbody').empty();
            //             var page_count=callback.page_count;
            //             var page_cont=callback.page_content;
            //             $('tbody').append(page_cont);
            //             $('#last_page').text(page_count)
            //         }
            // })
        }
	});
};
var getCateSecondData = function(page,size,callback){
	$.ajax({
		url:'/category/querySecondCategoryPaging',
		type:'get',
		data:{
			page:page,
			pageSize:size
		},
		dataType:'json',
		success:function(data){
			callback&&callback(data);
		}
	});
}

