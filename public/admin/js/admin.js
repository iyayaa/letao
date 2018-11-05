/*后台管理系统的公共js文件*/

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