$(function(){
	$('#submit').on('tap',function(){
		var data = CT.serialize2object($('.mui-input-group').serialize());
		// console.log(data);
		if(data.username ==''){
			mui.toast('请输入用户名');
			return false;
		}
		if(data.password ==''){
			mui.toast('请输入密码');
			return false;
		}
		login(data);

	});
	
});


var returnUrl = location.search.replace('?returnUrl=','');


login = function(data){
	$.ajax({
		url:'/user/login',
		type:'post',
		data:data,
		dataType:'json',
		success:function(data){
			if(data.success == true){
				if (returnUrl) {
				location.href = returnUrl;
				}else{
					location.href = '/user/login.html';
				}
			}else{
				mui.toast(data.message);
			}
		}

	});
}