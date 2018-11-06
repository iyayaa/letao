/*后台管理系统的公共js文件*/

// 进度条
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function () {
    /*只要使用的ajax就会执行这个方法*/
    /*开启进度条*/
    NProgress.start();
});
$(window).ajaxComplete(function () {
    /*结束进度条*/
    NProgress.done();
});

// 侧边栏的显示隐藏 二级菜单的显示隐藏

$('.ad_nav a:first-child').on('click',function(){
	$('.ad_aside').toggle();
	$('.ad_section').toggleClass('menu');
});
$('.menu [href="javascript:;"]').on('click',function () {
    $(this).siblings('.child').slideToggle();
})

//退出的模态框

var loginOutHtml = ["<div class=\"modal fade\"  id=\"loginOut\">",
					"  <div class=\"modal-dialog modal-sm\" role=\"document\">",
					"    <div class=\"modal-content\">",
					"      <div class=\"modal-header\">",
					"        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" ><span>&times;</span></button>",
					"        <h4 class=\"modal-title\">温馨提示</h4>",
					"      </div>",
					"      <div class=\"modal-body\">",
					"        <p class=\"text-danger\"><span class=\"glyphicon glyphicon-info-sign\"></span>您确定要退出后台管理系统吗？</p>",
					"      </div>",
					"      <div class=\"modal-footer\">",
					"        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button>",
					"        <button type=\"button\" class=\"btn btn-primary\">确定</button>",
					"      </div>",
					"    </div><!-- /.modal-content -->",
					"  </div><!-- /.modal-dialog -->",
					"</div><!-- /.modal -->"].join("");
$('body').append(loginOutHtml);
$('[data-logout]').on('click',function(){
	$('#loginOut').modal('show').find('.btn-primary').on('click',function(){
		$.ajax({
			url:'/employee/employeeLogout',
			type:'get',
			data:{},
			dataType:'json',
			success:function(data){
				if(data.success == true){
					$('#loginOut').modal('hide');
					location.href = '/admin/login.html';
				}
			}
		});
		
	});
});
