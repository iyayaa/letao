$(function(){
	$('#login').bootstrapValidator({
		/*配置校验的不同状态下显示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*需要校验的表单元素 通过名称 name*/
        fields: {
        	/*对应表单元素的name*/
            username: {
                /*校验规则 多个校验规则*/
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    /*配置一个校验规则*/
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码必须是6-18个字符'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
	}).on('success.form.bv', function (e) {
		e.preventDefault();
        var $form = $(e.target);
		// console.log($(e.target).serialize());
		// return;
		$.ajax({
			url:'/employee/employeeLogin',
			type:'post',
			data:$form.serialize(),
			dataType:'json',
			success:function (data) {
			    /*业务成功*/
                if(data.success == true){
                    location.href = '/admin/';
                }
                /*业务失败*/
                else {
                    if(data.error == 1000){
                        /*用户名错误*/
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    }else if(data.error == 1001){
                        /*密码错误*/
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    }
                }
			},
            error:function(data){
               
            }
		});

	});

});