myFunc(function() {
	updateSerivces();
	
	if (plus.os.name == "Android") {
        Intent = plus.android.importClass("android.content.Intent");
        File = plus.android.importClass("java.io.File");
        Uri = plus.android.importClass("android.net.Uri");
        main = plus.android.runtimeMainActivity();
	}
	
	//分享点击事件
	$(".share").tap(function() {
		$(".shareChoose").fadeIn();
	})
	
	//分享点击事件
	$(".shareChoose").tap(function() {
		$(".shareChoose").fadeOut();
	})
	
	$(".wechat").tap(function(){
		 shareAction("weixin","WXSceneSession");
		  $(".shareChoose").fadeOut();
	})
	/*朋友圈*/
	$(".pengyouquan").tap(function(){
    	 shareAction("weixin","WXSceneTimeline");
    	 $(".shareChoose").fadeOut();
	})
	
	/*取消分享*/
	$(".shareCancel").tap(function(){
		$(".shareChoose").fadeOut();
	})
	$(".Cancelshare").tap(function(){
		$(".shareChoose").hide();
	})
	
});
	/**
    * 分享操作
    */
    function shareAction(id, ex) {
        var s = null;
        if (!id || !(s = shares[id])) {
            osg.toast("无效的分享服务！");
            return;
        }
        if (s.authenticated) {
            //已授权
            shareMessage(s, ex);
        } else {
            //未授权
            s.authorize(function() {
                shareMessage(s, ex);
            }, function(e) {
                osg.toast("认证授权失败");
            });
        }
    }
	/**
    * 发送分享消息
    */
    function shareMessage(s, ex) {
        shareMsg.extra = {scene: ex};
        s.send(shareMsg, function() {
            osg.toast("分享成功!");
        }, function(e) {
            osg.toast("分享失败!");
        });
    }
	
	/**
     * 更新分享服务
     */
    function updateSerivces() {
        plus.share.getServices(function(s) {
            shares = {};
            for (var i in s) {
                var t = s[i];
                shares[t.id] = t;
            }
            console.log("获取分享服务列表成功");
        }, function(e) {
            console.log("获取分享服务列表失败：" + e.message);
        });
    }