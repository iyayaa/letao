window.CT = {};
CT.getParamsByUrl = function(){
	var search = location.search.substring(1);
	var params ={};
	if(search){
		var arr = search.split('&');
		arr.forEach(function(item){
			var itemArr = item.split('=');
			params[itemArr[0]] = itemArr[1];
		});
	}
	return params;
};

/*需要登录的ajax请求*/
CT.loginAjax = function(params){
	$.ajax({
		url:params.url,
		type:params.type,
		data:params.data,
		dataType:params.dataType,
		success:function(data){
			if(data.error == 400){
				location.href = '/m_ilin/user/login.html'+ '?returnUrl=' + location.href;
				return false;
			}else{
				params.success && params.success(data);
			}

		}, 
		error:function () {
            mui.toast('服务器繁忙');
        }
	});

};

//序列化
CT.serialize2object = function(serializeStr){
	// username=tt&password=f
	var obj = {};
	if(serializeStr){
		var arr = serializeStr.split('&');;
		arr.forEach(function(item){
			var itemArr= item.split('=');
			obj[itemArr[0]] = itemArr[1];
		});
	}
	
	return obj;

};